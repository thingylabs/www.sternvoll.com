#!/bin/bash
# scripts/create-hls.sh

# Check if a file parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <input-video-file>"
    exit 1
fi

# Get the input file and extract filename without extension
input_file="$1"
filename=$(basename "${input_file%.*}")

# Create output directory structure for HLS
output_dir="static/videos/$filename"
mkdir -p "$output_dir/v0"
mkdir -p "$output_dir/v1"
mkdir -p "$output_dir/v2"

# Create output directory for the poster image
poster_dir="static/scaled"
mkdir -p "$poster_dir"

echo "Creating HLS stream for $input_file..."
echo "Output directory: $output_dir"

# Create multiple resolutions with optimized encoding settings
ffmpeg -i "$input_file" \
  -c:v h264 -c:a aac \
  -filter_complex "\
  [0:v]split=3[v1][v2][v3]; \
  [v1]scale=w=1920:h=-2[v1out]; \
  [v2]scale=w=1280:h=-2[v2out]; \
  [v3]scale=w=854:h=-2[v3out]" \
  -map "[v1out]" -c:v:0 h264 -b:v:0 5000k \
  -map "[v2out]" -c:v:1 h264 -b:v:1 3000k \
  -map "[v3out]" -c:v:2 h264 -b:v:2 1500k \
  -map a:0 -map a:0 -map a:0 \
  -c:a aac -b:a:0 192k -b:a:1 128k -b:a:2 96k \
  -f hls \
  -hls_time 6 \
  -hls_list_size 0 \
  -hls_segment_type mpegts \
  -hls_segment_filename "$output_dir/v%v/segment%d.ts" \
  -hls_playlist_type vod \
  -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
  -master_pl_name master.m3u8 \
  "$output_dir/v%v/playlist.m3u8"

# Extract poster image and create different sizes
echo "Extracting poster images..."
ffmpeg -i "$input_file" -ss 00:00:01.000 -vframes 1 "${poster_dir}/${filename}-poster.png"

# Create poster image variants
for size in 1920 1280 854; do
  echo "Creating ${size}px wide poster image..."
  ffmpeg -i "${poster_dir}/${filename}-poster.png" \
    -vf "scale=${size}:-2" \
    "${poster_dir}/hero-video-cover-${size}.jpg"
  
  # Create WebP version
  ffmpeg -i "${poster_dir}/hero-video-cover-${size}.jpg" \
    "${poster_dir}/hero-video-cover-${size}.webp"
  
  # Create AVIF version if available
  if command -v avifenc &> /dev/null; then
    avifenc "${poster_dir}/hero-video-cover-${size}.jpg" \
      "${poster_dir}/hero-video-cover-${size}.avif"
  fi
done

# Cleanup original PNG
rm "${poster_dir}/${filename}-poster.png"

# Final message
echo "Done! Files created in $output_dir and ${poster_dir}"
echo ""
echo "Directory structure created:"
echo "├── static/"
echo "│   ├── videos/${filename}/"
echo "│   │   ├── master.m3u8"
echo "│   │   ├── v0/"
echo "│   │   │   ├── playlist.m3u8"
echo "│   │   │   ├── segment0.ts"
echo "│   │   │   └── ..."
echo "│   │   ├── v1/..."
echo "│   │   └── v2/..."
echo "│   └── scaled/"
echo "│       ├── hero-video-cover-1920.jpg"
echo "│       ├── hero-video-cover-1920.webp"
echo "│       ├── hero-video-cover-1920.avif"
echo "│       ├── hero-video-cover-1280.*"
echo "│       └── hero-video-cover-854.*"
echo ""
echo "Usage example:"
echo "<VideoPlayer"
echo "  posterImage=\"${filename}-poster\""
echo "  hlsUrl=\"/videos/${filename}/master.m3u8\""
echo "  alt=\"Video description\""
echo "  width={[1920, 1280, 854]}"
echo "  height={1080}"
echo "/>"