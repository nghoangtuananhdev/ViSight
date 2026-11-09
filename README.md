# ViSight – Trợ lý ảo truy xuất multimedia (AI Challenge TP.HCM 2026, Bảng A)

Bài tập BT08 (UX). Toàn bộ dữ liệu là **mô phỏng**.

- `src/` – các màn hình React, icon SVG và dữ liệu mô phỏng.
- `app/` – 6 màn hình 1440×900, được render thành HTML tĩnh bằng React.
- `figma-plugin/` – plugin Figma dev (`manifest.json`, `code.js`, `ui.html`) dựng lại các trang HTML thành frame + prototype.
- `slides/` – slide PPTX + PDF theo template IUH, ảnh PNG export từ Figma.
- `docs/` – mô tả đề tài, kịch bản demo.

## Chạy app

Mở terminal tại thư mục repo. Các trang đã được build sẵn để chạy trên GitHub Pages hoặc máy chủ tĩnh:

```sh
python3 -m http.server 5500
```

Mở `http://localhost:5500/`. Khi sửa JSX hoặc dữ liệu trong `src/`, dùng Node.js để tạo lại các trang:

```sh
npm ci
npm run build
```

Commit cùng các file HTML được cập nhật trong `app/`. CSS trong `app/assets/css/` giữ bố cục gốc. View Transitions chạy trên trình duyệt hỗ trợ và tôn trọng thiết lập giảm chuyển động.

## Import plugin vào Figma
Ctrl+/ → "Import plugin from manifest…" → chọn `figma-plugin/manifest.json` → chạy plugin → "Tạo màn hình trong Figma".
Sau khi chạy `npm run build`, tạo lại plugin bằng `node ../_tools/html2figma/build.mjs .`

## Prototype Figma
https://www.figma.com/proto/iwptTkrQcd0sGw1QPhYcRI/BT08-ViSight
