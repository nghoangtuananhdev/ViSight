import React, { Fragment } from 'react';
import M from './mock-data.js';
import { Icon } from './icons.jsx';
const fmt = function (n) {
  return n.toLocaleString('vi-VN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const NAV = [
  ['01-tong-quan', 'grid-1x2', 'Tổng quan'],
  ['02-tim-kiem', 'search', 'Tìm kiếm'],
  ['03-chuoi-su-kien', 'diagram-3', 'Chuỗi sự kiện'],
  ['04-chi-tiet-video', 'play-btn', 'Chi tiết video'],
  ['05-tro-ly-ai', 'stars', 'Trợ lý AI'],
  ['06-nop-dap-an', 'send-check', 'Nộp đáp án'],
];
function shell(page, title, sub, body) {
  const nav = NAV.map(function (n) {
    return (
      <a key={n[0]} className={'nav-i' + (n[0] === page ? ' on' : '')} href={n[0] + '.html'}>
        <Icon name={n[1]} />
        {n[2]}
      </a>
    );
  });
  return (
    <>
      <div className="side" data-figma-name="Sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Icon name="eye" />
          </div>
          <div>
            <div className="brand-name">ViSight</div>
            <div className="brand-sub">Trợ lý truy xuất multimedia</div>
          </div>
        </div>
        {nav}
        <div className="side-foot">
          <div className="srv">
            <div className="srv-t">
              <span className="dot" />
              Máy chủ chấm
            </div>
            <div className="srv-s">Đã kết nối · {M.session.latency} ms</div>
          </div>
          <div className="team">
            <div className="avatar">UX</div>
            <div>
              <div className="team-n">{M.session.team}</div>
              <div className="team-s">{M.session.board}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="topbar" data-figma-name="Thanh trên">
          <div className="crumb">
            {title}
            <small>{sub}</small>
          </div>
          <div className="qsearch">
            <Icon name="search" />
            <input placeholder="Mô tả cảnh cần tìm bằng tiếng Việt…" />
          </div>
          <div className="pill-t">
            <Icon name="stopwatch" />
            Câu {M.session.current}/{M.session.total} · còn {M.session.timeLeft}
          </div>
          <div className="ibtn">
            <Icon name="keyboard" />
          </div>
          <div className="avatar">UX</div>
        </div>
        <div className="content">{body}</div>
      </div>
    </>
  );
}
export const pages = {
  '01-tong-quan': function TongQuan() {
    const q = M.question,
      s = M.session;
    const stats = M.stats.map(function (x) {
      return (
        <div key={x.label} className="cd stat">
          <div className="stat-i">
            <Icon name={x.icon} />
          </div>
          <div>
            <div className="stat-n">{x.num}</div>
            <div className="stat-l">{x.label}</div>
          </div>
        </div>
      );
    });
    const rec = M.recent.map(function (r) {
      return (
        <div key={r.q} className="rec">
          <div>
            <div className="rec-q">{r.q}</div>
            <div className="faint">
              {r.mode} · {r.hits} kết quả
            </div>
          </div>
          <div className="faint">{r.ago}</div>
        </div>
      );
    });
    const idx = M.index.map(function (t) {
      return (
        <div key={t} className="ix">
          <Icon name="check-circle-fill" />
          {t}
        </div>
      );
    });
    return shell(
      '01-tong-quan',
      'Tổng quan phiên thi',
      'Hội thi AI Challenge TP.HCM 2026 · dữ liệu mô phỏng',
      <>
        <div className="cd qcard" data-figma-name="Card câu hỏi">
          <div className="qbody">
            <div className="badge-b">{q.label}</div>{' '}
            <span className="faint">
              Câu {s.current}/{s.total}
            </span>
            <div className="qtext">{q.text}</div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
              }}
            >
              <a className="btn-p" href="02-tim-kiem.html">
                <Icon name="search" />
                Bắt đầu tìm kiếm
              </a>
              <a className="btn-o" href="05-tro-ly-ai.html">
                <Icon name="stars" />
                Hỏi trợ lý AI
              </a>
            </div>
          </div>
          <div className="clock">
            <div className="clock-n">{s.timeLeft}</div>
            <div className="faint">thời gian còn lại</div>
          </div>
        </div>
        <div className="stats" data-figma-name="Số liệu kho dữ liệu">
          {stats}
        </div>
        <div className="cols">
          <div
            className="cd"
            style={{
              flex: '3',
            }}
          >
            <h2 className="h2">Tìm kiếm gần đây</h2>
            <div
              style={{
                marginTop: '8px',
              }}
            >
              {rec}
            </div>
          </div>
          <div
            style={{
              flex: '2',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div className="cd">
              <h2 className="h2">Kết quả phiên thi</h2>
              <div className="sc">
                <div
                  style={{
                    background: '#DCFCE7',
                    color: '#166534',
                  }}
                >
                  <b>{s.correct}</b>
                  <span>Đúng</span>
                </div>
                <div
                  style={{
                    background: '#FEE2E2',
                    color: '#991B1B',
                  }}
                >
                  <b>{s.wrong}</b>
                  <span>Sai</span>
                </div>
                <div
                  style={{
                    background: '#DBEAFE',
                    color: '#1E40AF',
                  }}
                >
                  <b>{s.score}</b>
                  <span>Điểm</span>
                </div>
              </div>
              <div className="bar">
                <div
                  style={{
                    width: (s.current / s.total) * 100 + '%',
                  }}
                />
              </div>
              <div className="faint">
                Tiến độ {s.current}/{s.total} câu
              </div>
            </div>
            <div
              className="cd"
              style={{
                flex: '1',
              }}
            >
              <h2 className="h2">Trạng thái chỉ mục AI</h2>
              <div
                style={{
                  marginTop: '8px',
                }}
              >
                {idx}
              </div>
            </div>
          </div>
        </div>
      </>,
    );
  },
  '02-tim-kiem': function TimKiem() {
    const modes = M.modes.map(function (m, i) {
      return (
        <span key={m} className={'chip' + (i === 0 ? ' on' : '')}>
          {m}
        </span>
      );
    });
    const cb = function (t, on) {
      return (
        <div className="cb">
          <span className={'cb-box' + (on ? ' on' : '')}>{on ? <Icon name="check2" /> : ''}</span>
          {t}
        </div>
      );
    };
    const objs = ['người', 'xe máy', 'ô tô', 'biển hiệu', 'nước ngập'].map(function (o, i) {
      return (
        <span key={o} className={'chip' + (i < 2 ? ' on' : '')}>
          {o}
        </span>
      );
    });
    const cols = ['#FACC15', '#DC2626', '#2563EB', '#16A34A', '#FFFFFF', '#0F172A'].map(
      function (c) {
        return (
          <span
            key={c}
            style={{
              background: c,
            }}
          />
        );
      },
    );
    const cards = M.results.map(function (r, i) {
      return (
        <a key={r.id} className="fcard" href="04-chi-tiet-video.html">
          <img src={r.img} alt="" loading="eager" />
          {i === 0 ? <span className="best">Khớp nhất</span> : ''}
          <span className="sc-b">{fmt(r.score)}</span>
          <div className="fid">
            {r.id} · {r.time}
          </div>
          <span className="chip-s">{r.tags.join(' · ')}</span>
        </a>
      );
    });
    return shell(
      '02-tim-kiem',
      'Kết quả tìm kiếm',
      'Văn bản → Hình ảnh',
      <>
        <div className="cd qbar">
          <textarea rows="1" defaultValue={M.question.text.slice(0, 82) + '…'} />
          <a className="btn-p" href="02-tim-kiem.html">
            Tìm
          </a>
          <div className="sq">
            <Icon name="image" />
          </div>
          <div className="sq">
            <Icon name="mic" />
          </div>
        </div>
        <div className="chips">{modes}</div>
        <div className="split">
          <div className="cd filters" data-figma-name="Bộ lọc">
            <div className="f-sec">
              <div className="f-t">Bản tin</div>
              {cb('Thời sự 19h', true)}
              {cb('Bản tin 60 giây', true)}
              {cb('Chuyển động 24h', false)}
            </div>
            <div className="f-sec">
              <div className="f-t">Khoảng thời gian</div>
              <div className="dinp">01/01/2024</div>
              <div className="dinp">31/03/2024</div>
            </div>
            <div className="f-sec">
              <div className="f-t">Đối tượng xuất hiện</div>
              <div className="chips-w">{objs}</div>
            </div>
            <div className="f-sec">
              <div className="f-t">Màu chủ đạo</div>
              <div className="sw-c">{cols}</div>
            </div>
            <div className="tog">
              <span>Gộp khung hình liền kề</span>
              <span className="tog-b">
                <i />
              </span>
            </div>
          </div>
          <div className="res">
            <div className="res-h">
              <div
                className="h2"
                style={{
                  fontSize: '16px',
                }}
              >
                Tìm thấy 1.240 khung hình · 0,42 giây
              </div>
              <div className="sel">
                Sắp xếp: Độ khớp <Icon name="chevron-down" />
              </div>
            </div>
            <div className="grid" data-figma-name="Lưới kết quả">
              {cards}
            </div>
          </div>
        </div>
      </>,
    );
  },
  '03-chuoi-su-kien': function ChuoiSuKien() {
    const st = [
      'Lính cứu hỏa kéo vòi nước vào con hẻm',
      'Xe cứu thương đến hiện trường',
      'Phóng viên phỏng vấn người dân',
    ];
    const steps = st.map(function (t, i) {
      return (
        <Fragment key={t}>
          <div className="cd step">
            <div className="step-n">{i + 1}</div>
            <div className="step-i">{t}</div>
          </div>
          {i < 2 ? (
            <div className="arrow">
              <Icon name="arrow-right" />
            </div>
          ) : (
            ''
          )}
        </Fragment>
      );
    });
    const rows = M.trake.map(function (v) {
      const th = v.steps.map(function (s) {
        return (
          <div key={s.time}>
            <img src={s.img} alt="" loading="eager" />
            <div className="t-time">{s.time}</div>
          </div>
        );
      });
      return (
        <div key={v.video} className="cd trow">
          <div className="t-info">
            <div
              className="h2"
              style={{
                fontSize: '16px',
              }}
            >
              {v.video} · {v.source}
            </div>
            <div className="faint">Điểm tổng</div>
            <div className="t-sc">{fmt(v.score)}</div>
          </div>
          <div className="t-th">{th}</div>
          <a className="btn-p" href="06-nop-dap-an.html">
            Nộp chuỗi này
          </a>
        </div>
      );
    });
    return shell(
      '03-chuoi-su-kien',
      'Truy vấn chuỗi sự kiện',
      'Dạng TRAKE · tìm các sự kiện theo đúng thứ tự thời gian',
      <>
        <div className="steps" data-figma-name="Các bước sự kiện">
          {steps}
          <a
            className="btn-o"
            style={{
              alignSelf: 'center',
              marginLeft: '8px',
            }}
            href="03-chuoi-su-kien.html"
          >
            <Icon name="plus-lg" />
            Thêm sự kiện
          </a>
        </div>
        <div className="cd cons">
          <div
            className="tog"
            style={{
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: '600',
              }}
            >
              Trong cùng 1 video
            </span>
            <span className="tog-b">
              <i />
            </span>
          </div>
          <div
            style={{
              fontSize: '16px',
            }}
          >
            <b>Khoảng cách tối đa giữa 2 sự kiện:</b> 60 giây
          </div>
        </div>
        <div
          className="h2"
          style={{
            marginBottom: '-8px',
          }}
        >
          Kết quả: 3 video khớp chuỗi sự kiện
        </div>
        {rows}
      </>,
    );
  },
  '04-chi-tiet-video': function ChiTietVideo() {
    const r = M.results[0];
    const fr = [0, 1, 2, 3, 4, 5, 6].map(function (i) {
      let m = M.results[(i + 3) % 12];
      if (i === 3) m = r;
      return (
        <div key={i} className={i === 3 ? 'cur' : ''}>
          <img src={m.img} alt="" loading="eager" />
          {i === 3 ? (
            <div
              className="faint"
              style={{
                fontSize: '14px',
                textAlign: 'center',
                color: '#1D4ED8',
                fontWeight: '600',
              }}
            >
              Khung 3214
            </div>
          ) : (
            ''
          )}
        </div>
      );
    });
    const tr = M.transcript.map(({ t, text, hit }) => (
      <div className="tl" key={t}>
        <div className="tl-t">{t}</div>
        <div>
          {hit
            ? text.split(hit).map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="hl">{hit}</span>}
                  <span>{line}</span>
                </Fragment>
              ))
            : text}
        </div>
      </div>
    ));
    return shell(
      '04-chi-tiet-video',
      'Chi tiết video L05_V012',
      'Bản tin 60 giây · dữ liệu mô phỏng',
      <div className="vd">
        <div className="vleft">
          <div className="player" data-figma-name="Trình phát">
            <img src={r.img} alt="" loading="eager" />
            <div className="play-b">
              <Icon name="play-fill" />
            </div>
            <div className="ctrl">
              <Icon name="play-fill" />
              <span>02:14 / 04:50</span>
              <div className="ctrl-tl">
                <i />
              </div>
              <span>1.0x</span>
              <Icon name="volume-up" />
              <Icon name="fullscreen" />
            </div>
          </div>
          <div>
            <div
              className="faint"
              style={{
                marginBottom: '4px',
              }}
            >
              Đoạn khớp với truy vấn
            </div>
            <div className="heat">
              <i
                style={{
                  left: '12%',
                  width: '7%',
                  opacity: '0.45',
                }}
              />
              <i
                style={{
                  left: '44%',
                  width: '9%',
                  opacity: '1',
                }}
              />
              <i
                style={{
                  left: '70%',
                  width: '6%',
                  opacity: '0.65',
                }}
              />
            </div>
          </div>
          <div className="frames" data-figma-name="Khung hình lân cận">
            {fr}
          </div>
        </div>
        <div className="vright">
          <div
            className="cd"
            style={{
              flex: '1',
            }}
          >
            <div className="tabs">
              <div className="tab on">Lời thoại</div>
              <div className="tab">Chữ trên hình</div>
              <div className="tab">Đối tượng</div>
            </div>
            <div
              style={{
                marginTop: '6px',
              }}
            >
              {tr}
            </div>
          </div>
          <div
            className="cd"
            style={{
              padding: '14px 20px',
            }}
          >
            <div className="meta">
              <span className="faint">Video</span>
              <b>L05_V012 · Bản tin 60 giây</b>
            </div>
            <div className="meta">
              <span className="faint">Ngày phát (mô phỏng)</span>
              <b>12/03/2024</b>
            </div>
            <div className="meta">
              <span className="faint">Khung · thời điểm</span>
              <b>3214 · 02:14</b>
            </div>
          </div>
          <a
            className="btn-p"
            style={{
              height: '52px',
            }}
            href="06-nop-dap-an.html"
          >
            Gửi đáp án (KIS)
          </a>
          <a className="btn-o" href="02-tim-kiem.html">
            Tìm cảnh tương tự
          </a>
        </div>
      </div>,
    );
  },
  '05-tro-ly-ai': function TroLyAi() {
    const th = [0, 2, 3].map(function (i) {
      return (
        <a key={i} href="04-chi-tiet-video.html">
          <img src={M.results[i].img} alt="" loading="eager" />
          <span className="chip-s">
            <Icon name="check2" />
            áo mưa vàng <Icon name="check2" />
            biển đỏ
          </span>
        </a>
      );
    });
    const sg = ['Chỉ lấy cảnh ban ngày', 'Mở rộng sang video lân cận', 'Tìm theo lời thoại'].map(
      function (t) {
        return (
          <span key={t} className="chip">
            {t}
          </span>
        );
      },
    );
    const w = function (n, p, c) {
      return (
        <div className="w-row">
          <div className="w-top">
            <span>{n}</span>
            <span>{p}%</span>
          </div>
          <div className="bar">
            <div
              style={{
                width: p + '%',
                background: c,
              }}
            />
          </div>
        </div>
      );
    };
    return shell(
      '05-tro-ly-ai',
      'Trợ lý AI',
      'Hỏi đáp để thu hẹp kết quả',
      <div className="split">
        <div className="cd chat" data-figma-name="Khung chat">
          <div className="msgs">
            <div className="b-u">
              Tìm giúp mình cảnh người mặc áo mưa vàng đi xe máy qua chỗ ngập, phía sau có biển hiệu
              đỏ.
            </div>
            <div className="b-a">
              Mình đã tách yêu cầu thành 3 ý: (1) áo mưa màu vàng, (2) xe máy và đường ngập, (3)
              biển hiệu màu đỏ. Đây là 3 khung hình khớp nhất:
              <div className="mini">{th}</div>
            </div>
          </div>
          <div
            className="chips"
            style={{
              marginTop: '12px',
            }}
          >
            {sg}
          </div>
          <div className="ibox">
            <Icon name="paperclip" />
            <input placeholder="Nhập câu hỏi cho trợ lý…" />
            <Icon name="mic" />
            <span className="send">
              <Icon name="send-fill" />
            </span>
          </div>
        </div>
        <div className="cd why" data-figma-name="Giải thích">
          <h2 className="h2">Vì sao AI chọn kết quả này?</h2>
          {w('Hình ảnh (CLIP)', 60, '#1D4ED8')}
          {w('Chữ trên hình (OCR)', 25, '#F59E0B')}
          {w('Lời thoại (ASR)', 15, '#16A34A')}
          <div className="w-row">
            <div className="f-t">Truy vấn đã viết lại</div>
            <div className="quote">
              người mặc áo mưa vàng, xe máy, đường ngập nước, biển hiệu đỏ
            </div>
          </div>
          <div className="note">
            <Icon name="lightning-charge-fill" />
            <span>AI có thể sai, hãy kiểm tra trước khi nộp</span>
          </div>
        </div>
      </div>,
    );
  },
  '06-nop-dap-an': function NopDapAn() {
    const r = M.results[0];
    const rows = M.history.map(function (h) {
      return (
        <div key={h.q} className="tr">
          <div className="c1">{h.q}</div>
          <div className="c2">{h.type}</div>
          <div className="c3">{h.answer}</div>
          <div className="c4">{h.time}</div>
          <div className="c5">
            <span className={'badge-b ' + (h.ok ? 'badge-g' : 'badge-r')}>
              {h.ok ? 'Đúng' : 'Sai'}
            </span>
          </div>
          <div className="c6">{h.pts}</div>
        </div>
      );
    });
    return shell(
      '06-nop-dap-an',
      'Nộp đáp án',
      'Xác nhận trước khi gửi để tránh nộp nhầm',
      <>
        <div className="cd confirm" data-figma-name="Xác nhận nộp">
          <img src={r.img} alt="" loading="eager" />
          <div className="cf-body">
            <div className="badge-b">KIS</div>
            <div
              className="h2"
              style={{
                marginTop: '6px',
              }}
            >
              L05_V012 · Khung 3214 · 02:14
            </div>
            <div className="note-in">Ghi chú (tuỳ chọn)</div>
          </div>
          <div className="cf-btn">
            <a className="btn-p" href="06-nop-dap-an.html">
              Xác nhận nộp
            </a>
            <a className="btn-g" href="04-chi-tiet-video.html">
              Huỷ
            </a>
          </div>
        </div>
        <div className="ok-b" data-figma-name="Kết quả">
          <Icon name="check-circle-fill" />
          <div className="ok-t">Chính xác! +100 điểm · thời gian 01:28</div>
          <a className="btn-p" href="01-tong-quan.html">
            Sang câu tiếp theo
          </a>
        </div>
        <div
          className="cd"
          style={{
            padding: '20px 0 0',
            flex: '1',
            overflow: 'hidden',
          }}
        >
          <h2
            className="h2"
            style={{
              padding: '0 24px 12px',
            }}
          >
            Lịch sử nộp bài
          </h2>
          <div className="tbl">
            <div className="tr h">
              <div className="c1">Câu</div>
              <div className="c2">Loại</div>
              <div className="c3">Đáp án</div>
              <div className="c4">Thời gian</div>
              <div className="c5">Kết quả</div>
              <div className="c6">Điểm</div>
            </div>
            {rows}
          </div>
        </div>
      </>,
    );
  },
};
