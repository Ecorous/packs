echo "Running MMC Pack generation"
python3 build-scripts/mmc.py &&
echo "Running json file generation"
python3 build-scripts/generate-list.py &&
echo "Building site"
npm run build
echo "✨ Done!"