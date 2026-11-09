# ViSight – Trợ lý ảo truy xuất multimedia (AI Challenge TP.HCM 2026, Bảng A)

Bài tập BT08 (UX). Toàn bộ dữ liệu là **mô phỏng**.

- `app/` – front-end tĩnh (HTML, CSS, JS, jQuery, Bootstrap 5), 6 màn hình 1440×900.
- `figma-plugin/` – plugin Figma dev (`manifest.json`, `code.js`, `ui.html`) dựng lại các trang HTML thành frame + prototype.
- `slides/` – slide PPTX + PDF theo template IUH, ảnh PNG export từ Figma.
- `docs/` – mô tả đề tài, kịch bản demo.

## Chạy app
```
node ../_tools/serve.mjs app 5501
```
Mở http://localhost:5501/ .

## Import plugin vào Figma
Ctrl+/ → "Import plugin from manifest…" → chọn `figma-plugin/manifest.json` → chạy plugin → "Tạo màn hình trong Figma".
Build lại plugin sau khi sửa app: `node ../_tools/html2figma/build.mjs .`

## Prototype Figma
https://www.figma.com/proto/iwptTkrQcd0sGw1QPhYcRI/BT08-ViSight
