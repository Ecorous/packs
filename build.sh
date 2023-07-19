python3 build-scripts/mmc.py &&
python3 build-scripts/generate-list.py &&
npm run build &&
rm -f .svelte-kit/cloudflare/_routes.json 