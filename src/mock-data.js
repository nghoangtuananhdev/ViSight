// Toàn bộ dữ liệu là MÔ PHỎNG phục vụ bài tập thiết kế UX.

const I = function (n) {
  return 'assets/img/kf' + n + '.jpg';
};
const order = [
  '08',
  '11',
  '07',
  '01',
  '09',
  '10',
  '04',
  '05',
  '03',
  '02',
  '08',
  '11',
];
const tags = [
  ['áo mưa vàng', 'xe máy'],
  ['áo mưa', 'đường ngập'],
  ['xe máy', 'biển đỏ'],
  ['xe máy', 'đường phố'],
  ['áo mưa vàng', 'biển hiệu'],
  ['mưa', 'xe máy'],
  ['biển đỏ', 'người'],
  ['nước ngập', 'xe máy'],
  ['xe cứu thương', 'đường'],
  ['người', 'xe máy'],
  ['áo mưa', 'biển đỏ'],
  ['xe máy', 'nước ngập'],
];
const scores = [
  0.87, 0.84, 0.81, 0.79, 0.77, 0.74, 0.72, 0.7, 0.68, 0.66, 0.64, 0.62,
];
const ids = [
  'L05_V012',
  'L05_V009',
  'L08_V021',
  'L03_V004',
  'L11_V017',
  'L02_V030',
  'L07_V015',
  'L05_V018',
  'L09_V002',
  'L12_V011',
  'L04_V027',
  'L06_V008',
];
const times = [
  '02:14',
  '01:48',
  '00:37',
  '03:05',
  '02:51',
  '01:12',
  '04:02',
  '00:55',
  '03:40',
  '02:03',
  '01:29',
  '03:18',
];
const data = {
  session: {
    team: 'Đội UX Solo',
    board: 'Bảng A',
    current: 7,
    total: 20,
    timeLeft: '04:32',
    score: 540,
    correct: 6,
    wrong: 1,
    latency: 38,
  },
  question: {
    type: 'KIS',
    label: 'KIS · Tìm khung hình',
    text: 'Cảnh một người đàn ông mặc áo mưa màu vàng chạy xe máy qua đoạn đường ngập nước, phía sau có biển hiệu màu đỏ.',
  },
  stats: [
    { icon: 'camera-video', num: '1.248', label: 'video' },
    { icon: 'clock-history', num: '312', label: 'giờ dữ liệu' },
    { icon: 'images', num: '186.540', label: 'khung hình chính' },
    {
      icon: 'translate',
      num: '3',
      label: 'phương thức: Hình ảnh · Âm thanh · Văn bản',
    },
  ],
  recent: [
    {
      q: 'lính cứu hỏa phun nước vào tòa nhà',
      mode: 'Văn bản',
      hits: 312,
      ago: '3 phút trước',
    },
    {
      q: 'MC nữ áo dài xanh dẫn bản tin',
      mode: 'Văn bản',
      hits: 87,
      ago: '9 phút trước',
    },
    {
      q: 'biển số xe 51F',
      mode: 'Chữ trên hình',
      hits: 45,
      ago: '14 phút trước',
    },
    {
      q: 'tiếng còi xe cứu thương',
      mode: 'Lời thoại',
      hits: 29,
      ago: '21 phút trước',
    },
  ],
  index: [
    'Nhúng ảnh–văn bản (CLIP)',
    'Nhận dạng giọng nói tiếng Việt (ASR)',
    'Nhận dạng chữ trên hình (OCR)',
    'Phát hiện đối tượng',
  ],
  modes: [
    'Văn bản → Hình ảnh',
    'Ảnh tương tự',
    'Lời thoại (ASR)',
    'Chữ trên hình (OCR)',
    'Đối tượng',
  ],
  results: ids.map(function (id, i) {
    return {
      id: id,
      frame: 3214 + i * 37,
      time: times[i],
      score: scores[i],
      img: I(order[i]),
      tags: tags[i],
    };
  }),
  trake: [
    {
      video: 'L12_V007',
      source: 'Bản tin 60 giây',
      score: 0.91,
      steps: [
        { time: '01:05', img: I('02') },
        { time: '01:32', img: I('03') },
        { time: '02:10', img: I('09') },
      ],
    },
    {
      video: 'L03_V019',
      source: 'Thời sự 19h',
      score: 0.84,
      steps: [
        { time: '00:48', img: I('02') },
        { time: '01:20', img: I('03') },
        { time: '01:59', img: I('04') },
      ],
    },
    {
      video: 'L08_V002',
      source: 'Chuyển động 24h',
      score: 0.77,
      steps: [
        { time: '02:31', img: I('10') },
        { time: '03:02', img: I('03') },
        { time: '03:44', img: I('05') },
      ],
    },
  ],
  transcript: [
    {
      t: '02:02',
      text: 'Chiều nay, nhiều tuyến phố trung tâm TP.HCM xuất hiện mưa lớn.',
    },
    {
      t: '02:06',
      text: 'Triều cường cộng mưa khiến nước dâng nhanh ở các điểm trũng.',
    },
    {
      t: '02:10',
      text: 'Mưa lớn kéo dài khiến nhiều tuyến đường ở TP.HCM bị ngập sâu.',
    },
    {
      t: '02:14',
      text: 'Người dân mặc áo mưa vàng dắt xe máy qua đoạn ngập.',
      hit: 'áo mưa vàng',
    },
    {
      t: '02:19',
      text: 'Lực lượng chức năng điều tiết giao thông tại giao lộ.',
    },
    { t: '02:25', text: 'Dự báo mưa còn kéo dài đến tối nay.' },
  ],
  history: [
    {
      q: 1,
      type: 'KIS',
      answer: 'L01_V003 · 00:42',
      time: '00:55',
      ok: true,
      pts: 100,
    },
    {
      q: 2,
      type: 'QA',
      answer: 'Đáp án: 3 người',
      time: '01:10',
      ok: true,
      pts: 80,
    },
    {
      q: 3,
      type: 'KIS',
      answer: 'L04_V011 · 03:21',
      time: '02:05',
      ok: true,
      pts: 100,
    },
    {
      q: 4,
      type: 'TRAKE',
      answer: 'L12_V002 · 3 bước',
      time: '03:40',
      ok: false,
      pts: 0,
    },
    {
      q: 5,
      type: 'KIS',
      answer: 'L06_V020 · 01:03',
      time: '00:48',
      ok: true,
      pts: 100,
    },
    {
      q: 6,
      type: 'QA',
      answer: 'Đáp án: Xe buýt',
      time: '00:36',
      ok: true,
      pts: 80,
    },
    {
      q: 7,
      type: 'KIS',
      answer: 'L05_V012 · 02:14',
      time: '01:28',
      ok: true,
      pts: 100,
    },
  ],
};
export default data;
