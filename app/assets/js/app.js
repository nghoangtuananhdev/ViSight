window.asset = function (p) { return (window.__ASSETS && window.__ASSETS[p]) || p; };
function renderIcons(root) {
  $(root || document).find('[data-icon]').each(function () {
    var svg = (window.ICONS || {})[this.getAttribute('data-icon')]; if (!svg) return;
    var $svg = $(svg).addClass('ico ' + (this.className || '')).attr('aria-hidden', 'true');
    $(this).replaceWith($svg);
  });
}
var M = window.MOCK;
var fmt = function (n) { return n.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
var ic = function (n) { return '<span class="ico" data-icon="' + n + '"></span>'; };

var NAV = [
  ['01-tong-quan', 'grid-1x2', 'Tổng quan'], ['02-tim-kiem', 'search', 'Tìm kiếm'], ['03-chuoi-su-kien', 'diagram-3', 'Chuỗi sự kiện'],
  ['04-chi-tiet-video', 'play-btn', 'Chi tiết video'], ['05-tro-ly-ai', 'stars', 'Trợ lý AI'], ['06-nop-dap-an', 'send-check', 'Nộp đáp án']
];

function shell(page, title, sub, body) {
  var nav = NAV.map(function (n) {
    return '<a class="nav-i' + (n[0] === page ? ' on' : '') + '" href="' + n[0] + '.html">' + ic(n[1]) + n[2] + '</a>';
  }).join('');
  return '<div class="side" data-figma-name="Sidebar">' +
    '<div class="brand"><div class="brand-mark">' + ic('eye') + '</div><div><div class="brand-name">ViSight</div><div class="brand-sub">Trợ lý truy xuất multimedia</div></div></div>' +
    nav +
    '<div class="side-foot"><div class="srv"><div class="srv-t"><span class="dot"></span>Máy chủ chấm</div><div class="srv-s">Đã kết nối · ' + M.session.latency + ' ms</div></div>' +
    '<div class="team"><div class="avatar">UX</div><div><div class="team-n">' + M.session.team + '</div><div class="team-s">' + M.session.board + '</div></div></div></div></div>' +
    '<div class="main"><div class="topbar" data-figma-name="Thanh trên">' +
    '<div class="crumb">' + title + '<small>' + sub + '</small></div>' +
    '<div class="qsearch">' + ic('search') + '<input placeholder="Mô tả cảnh cần tìm bằng tiếng Việt…"></div>' +
    '<div class="pill-t">' + ic('stopwatch') + 'Câu ' + M.session.current + '/' + M.session.total + ' · còn ' + M.session.timeLeft + '</div>' +
    '<div class="ibtn">' + ic('keyboard') + '</div><div class="avatar">UX</div></div>' +
    '<div class="content">' + body + '</div></div>';
}

var PAGES = {
  '01-tong-quan': function () {
    var q = M.question, s = M.session;
    var stats = M.stats.map(function (x) {
      return '<div class="cd stat"><div class="stat-i">' + ic(x.icon) + '</div><div><div class="stat-n">' + x.num + '</div><div class="stat-l">' + x.label + '</div></div></div>';
    }).join('');
    var rec = M.recent.map(function (r) {
      return '<div class="rec"><div><div class="rec-q">' + r.q + '</div><div class="faint">' + r.mode + ' · ' + r.hits + ' kết quả</div></div><div class="faint">' + r.ago + '</div></div>';
    }).join('');
    var idx = M.index.map(function (t) { return '<div class="ix">' + ic('check-circle-fill') + t + '</div>'; }).join('');
    return shell('01-tong-quan', 'Tổng quan phiên thi', 'Hội thi AI Challenge TP.HCM 2026 · dữ liệu mô phỏng',
      '<div class="cd qcard" data-figma-name="Card câu hỏi"><div class="qbody"><div class="badge-b">' + q.label + '</div> <span class="faint">Câu ' + s.current + '/' + s.total + '</span>' +
      '<div class="qtext">' + q.text + '</div>' +
      '<div style="display:flex;gap:12px"><a class="btn-p" href="02-tim-kiem.html">' + ic('search') + 'Bắt đầu tìm kiếm</a><a class="btn-o" href="05-tro-ly-ai.html">' + ic('stars') + 'Hỏi trợ lý AI</a></div></div>' +
      '<div class="clock"><div class="clock-n">' + s.timeLeft + '</div><div class="faint">thời gian còn lại</div></div></div>' +
      '<div class="stats" data-figma-name="Số liệu kho dữ liệu">' + stats + '</div>' +
      '<div class="cols"><div class="cd" style="flex:3"><h2 class="h2">Tìm kiếm gần đây</h2><div style="margin-top:8px">' + rec + '</div></div>' +
      '<div style="flex:2;display:flex;flex-direction:column;gap:20px"><div class="cd"><h2 class="h2">Kết quả phiên thi</h2>' +
      '<div class="sc"><div style="background:#DCFCE7;color:#166534"><b>' + s.correct + '</b><span>Đúng</span></div><div style="background:#FEE2E2;color:#991B1B"><b>' + s.wrong + '</b><span>Sai</span></div><div style="background:#DBEAFE;color:#1E40AF"><b>' + s.score + '</b><span>Điểm</span></div></div>' +
      '<div class="bar"><div style="width:' + (s.current / s.total * 100) + '%"></div></div><div class="faint">Tiến độ ' + s.current + '/' + s.total + ' câu</div></div>' +
      '<div class="cd" style="flex:1"><h2 class="h2">Trạng thái chỉ mục AI</h2><div style="margin-top:8px">' + idx + '</div></div></div></div>');
  },

  '02-tim-kiem': function () {
    var modes = M.modes.map(function (m, i) { return '<span class="chip' + (i === 0 ? ' on' : '') + '">' + m + '</span>'; }).join('');
    var cb = function (t, on) { return '<div class="cb"><span class="cb-box' + (on ? ' on' : '') + '">' + (on ? ic('check2') : '') + '</span>' + t + '</div>'; };
    var objs = ['người', 'xe máy', 'ô tô', 'biển hiệu', 'nước ngập'].map(function (o, i) { return '<span class="chip' + (i < 2 ? ' on' : '') + '">' + o + '</span>'; }).join('');
    var cols = ['#FACC15', '#DC2626', '#2563EB', '#16A34A', '#FFFFFF', '#0F172A'].map(function (c) { return '<span style="background:' + c + '"></span>'; }).join('');
    var cards = M.results.map(function (r, i) {
      return '<a class="fcard" href="04-chi-tiet-video.html"><img src="' + asset(r.img) + '">' + (i === 0 ? '<span class="best">Khớp nhất</span>' : '') +
        '<span class="sc-b">' + fmt(r.score) + '</span><div class="fid">' + r.id + ' · ' + r.time + '</div><span class="chip-s">' + r.tags.join(' · ') + '</span></a>';
    }).join('');
    return shell('02-tim-kiem', 'Kết quả tìm kiếm', 'Văn bản → Hình ảnh',
      '<div class="cd qbar"><textarea rows="1">' + M.question.text.slice(0, 82) + '…</textarea><a class="btn-p" href="02-tim-kiem.html">Tìm</a><div class="sq">' + ic('image') + '</div><div class="sq">' + ic('mic') + '</div></div>' +
      '<div class="chips">' + modes + '</div>' +
      '<div class="split"><div class="cd filters" data-figma-name="Bộ lọc">' +
      '<div class="f-sec"><div class="f-t">Bản tin</div>' + cb('Thời sự 19h', true) + cb('Bản tin 60 giây', true) + cb('Chuyển động 24h', false) + '</div>' +
      '<div class="f-sec"><div class="f-t">Khoảng thời gian</div><div class="dinp">01/01/2024</div><div class="dinp">31/03/2024</div></div>' +
      '<div class="f-sec"><div class="f-t">Đối tượng xuất hiện</div><div class="chips-w">' + objs + '</div></div>' +
      '<div class="f-sec"><div class="f-t">Màu chủ đạo</div><div class="sw-c">' + cols + '</div></div>' +
      '<div class="tog"><span>Gộp khung hình liền kề</span><span class="tog-b"><i></i></span></div></div>' +
      '<div class="res"><div class="res-h"><div class="h2" style="font-size:16px">Tìm thấy 1.240 khung hình · 0,42 giây</div><div class="sel">Sắp xếp: Độ khớp ' + ic('chevron-down') + '</div></div>' +
      '<div class="grid" data-figma-name="Lưới kết quả">' + cards + '</div></div></div>');
  },

  '03-chuoi-su-kien': function () {
    var st = ['Lính cứu hỏa kéo vòi nước vào con hẻm', 'Xe cứu thương đến hiện trường', 'Phóng viên phỏng vấn người dân'];
    var steps = st.map(function (t, i) {
      return '<div class="cd step"><div class="step-n">' + (i + 1) + '</div><div class="step-i">' + t + '</div></div>' + (i < 2 ? '<div class="arrow">' + ic('arrow-right') + '</div>' : '');
    }).join('');
    var rows = M.trake.map(function (v) {
      var th = v.steps.map(function (s) { return '<div><img src="' + asset(s.img) + '"><div class="t-time">' + s.time + '</div></div>'; }).join('');
      return '<div class="cd trow"><div class="t-info"><div class="h2" style="font-size:16px">' + v.video + ' · ' + v.source + '</div><div class="faint">Điểm tổng</div><div class="t-sc">' + fmt(v.score) + '</div></div>' +
        '<div class="t-th">' + th + '</div><a class="btn-p" href="06-nop-dap-an.html">Nộp chuỗi này</a></div>';
    }).join('');
    return shell('03-chuoi-su-kien', 'Truy vấn chuỗi sự kiện', 'Dạng TRAKE · tìm các sự kiện theo đúng thứ tự thời gian',
      '<div class="steps" data-figma-name="Các bước sự kiện">' + steps + '<a class="btn-o" style="align-self:center;margin-left:8px" href="03-chuoi-su-kien.html">' + ic('plus-lg') + 'Thêm sự kiện</a></div>' +
      '<div class="cd cons"><div class="tog" style="gap:12px"><span style="font-size:16px;font-weight:600">Trong cùng 1 video</span><span class="tog-b"><i></i></span></div>' +
      '<div style="font-size:16px"><b>Khoảng cách tối đa giữa 2 sự kiện:</b> 60 giây</div></div>' +
      '<div class="h2" style="margin-bottom:-8px">Kết quả: 3 video khớp chuỗi sự kiện</div>' + rows);
  },

  '04-chi-tiet-video': function () {
    var r = M.results[0];
    var fr = [0, 1, 2, 3, 4, 5, 6].map(function (i) {
      var m = M.results[(i + 3) % 12]; if (i === 3) m = r;
      return '<div' + (i === 3 ? ' class="cur"' : '') + '><img src="' + asset(m.img) + '">' + (i === 3 ? '<div class="faint" style="font-size:14px;text-align:center;color:#1D4ED8;font-weight:600">Khung 3214</div>' : '') + '</div>';
    }).join('');
    var tr = M.transcript.map(function (t) {
      var body = t.hit ? t.text.split(t.hit).join('</span><span class="hl">' + t.hit + '</span><span>') : t.text;
      return '<div class="tl"><div class="tl-t">' + t.t + '</div><div>' + (t.hit ? '<span>' + body + '</span>' : t.text) + '</div></div>';
    }).join('');
    return shell('04-chi-tiet-video', 'Chi tiết video L05_V012', 'Bản tin 60 giây · dữ liệu mô phỏng',
      '<div class="vd"><div class="vleft"><div class="player" data-figma-name="Trình phát"><img src="' + asset(r.img) + '"><div class="play-b">' + ic('play-fill') + '</div>' +
      '<div class="ctrl">' + ic('play-fill') + '<span>02:14 / 04:50</span><div class="ctrl-tl"><i></i></div><span>1.0x</span>' + ic('volume-up') + ic('fullscreen') + '</div></div>' +
      '<div><div class="faint" style="margin-bottom:4px">Đoạn khớp với truy vấn</div><div class="heat"><i style="left:12%;width:7%;opacity:0.45"></i><i style="left:44%;width:9%;opacity:1"></i><i style="left:70%;width:6%;opacity:0.65"></i></div></div>' +
      '<div class="frames" data-figma-name="Khung hình lân cận">' + fr + '</div></div>' +
      '<div class="vright"><div class="cd" style="flex:1"><div class="tabs"><div class="tab on">Lời thoại</div><div class="tab">Chữ trên hình</div><div class="tab">Đối tượng</div></div><div style="margin-top:6px">' + tr + '</div></div>' +
      '<div class="cd" style="padding:14px 20px"><div class="meta"><span class="faint">Video</span><b>L05_V012 · Bản tin 60 giây</b></div><div class="meta"><span class="faint">Ngày phát (mô phỏng)</span><b>12/03/2024</b></div><div class="meta"><span class="faint">Khung · thời điểm</span><b>3214 · 02:14</b></div></div>' +
      '<a class="btn-p" style="height:52px" href="06-nop-dap-an.html">Gửi đáp án (KIS)</a><a class="btn-o" href="02-tim-kiem.html">Tìm cảnh tương tự</a></div></div>');
  },

  '05-tro-ly-ai': function () {
    var th = [0, 2, 3].map(function (i) {
      return '<a href="04-chi-tiet-video.html"><img src="' + asset(M.results[i].img) + '"><span class="chip-s">' + ic('check2') + 'áo mưa vàng ' + ic('check2') + 'biển đỏ</span></a>';
    }).join('');
    var sg = ['Chỉ lấy cảnh ban ngày', 'Mở rộng sang video lân cận', 'Tìm theo lời thoại'].map(function (t) { return '<span class="chip">' + t + '</span>'; }).join('');
    var w = function (n, p, c) { return '<div class="w-row"><div class="w-top"><span>' + n + '</span><span>' + p + '%</span></div><div class="bar"><div style="width:' + p + '%;background:' + c + '"></div></div></div>'; };
    return shell('05-tro-ly-ai', 'Trợ lý AI', 'Hỏi đáp để thu hẹp kết quả',
      '<div class="split"><div class="cd chat" data-figma-name="Khung chat"><div class="msgs">' +
      '<div class="b-u">Tìm giúp mình cảnh người mặc áo mưa vàng đi xe máy qua chỗ ngập, phía sau có biển hiệu đỏ.</div>' +
      '<div class="b-a">Mình đã tách yêu cầu thành 3 ý: (1) áo mưa màu vàng, (2) xe máy và đường ngập, (3) biển hiệu màu đỏ. Đây là 3 khung hình khớp nhất:<div class="mini">' + th + '</div></div></div>' +
      '<div class="chips" style="margin-top:12px">' + sg + '</div>' +
      '<div class="ibox">' + ic('paperclip') + '<input placeholder="Nhập câu hỏi cho trợ lý…">' + ic('mic') + '<span class="send">' + ic('send-fill') + '</span></div></div>' +
      '<div class="cd why" data-figma-name="Giải thích"><h2 class="h2">Vì sao AI chọn kết quả này?</h2>' +
      w('Hình ảnh (CLIP)', 60, '#1D4ED8') + w('Chữ trên hình (OCR)', 25, '#F59E0B') + w('Lời thoại (ASR)', 15, '#16A34A') +
      '<div class="w-row"><div class="f-t">Truy vấn đã viết lại</div><div class="quote">người mặc áo mưa vàng, xe máy, đường ngập nước, biển hiệu đỏ</div></div>' +
      '<div class="note">' + ic('lightning-charge-fill') + '<span>AI có thể sai, hãy kiểm tra trước khi nộp</span></div></div></div>');
  },

  '06-nop-dap-an': function () {
    var r = M.results[0];
    var rows = M.history.map(function (h) {
      return '<div class="tr"><div class="c1">' + h.q + '</div><div class="c2">' + h.type + '</div><div class="c3">' + h.answer + '</div><div class="c4">' + h.time + '</div>' +
        '<div class="c5"><span class="badge-b ' + (h.ok ? 'badge-g' : 'badge-r') + '">' + (h.ok ? 'Đúng' : 'Sai') + '</span></div><div class="c6">' + h.pts + '</div></div>';
    }).join('');
    return shell('06-nop-dap-an', 'Nộp đáp án', 'Xác nhận trước khi gửi để tránh nộp nhầm',
      '<div class="cd confirm" data-figma-name="Xác nhận nộp"><img src="' + asset(r.img) + '"><div class="cf-body"><div class="badge-b">KIS</div><div class="h2" style="margin-top:6px">L05_V012 · Khung 3214 · 02:14</div>' +
      '<div class="note-in">Ghi chú (tuỳ chọn)</div></div><div class="cf-btn"><a class="btn-p" href="06-nop-dap-an.html">Xác nhận nộp</a><a class="btn-g" href="04-chi-tiet-video.html">Huỷ</a></div></div>' +
      '<div class="ok-b" data-figma-name="Kết quả">' + ic('check-circle-fill') + '<div class="ok-t">Chính xác! +100 điểm · thời gian 01:28</div><a class="btn-p" href="01-tong-quan.html">Sang câu tiếp theo</a></div>' +
      '<div class="cd" style="padding:20px 0 0;flex:1;overflow:hidden"><h2 class="h2" style="padding:0 24px 12px">Lịch sử nộp bài</h2><div class="tbl">' +
      '<div class="tr h"><div class="c1">Câu</div><div class="c2">Loại</div><div class="c3">Đáp án</div><div class="c4">Thời gian</div><div class="c5">Kết quả</div><div class="c6">Điểm</div></div>' + rows + '</div></div>');
  }
};

$(function () {
  var p = document.body.getAttribute('data-page');
  $('#app').html(PAGES[p]());
  renderIcons();
});
