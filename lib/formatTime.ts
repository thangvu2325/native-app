export default function formatTimeDifference(targetTime: Date | undefined) {
  const now = new Date();
  if (targetTime === undefined) {
    return "Invalid date";
  }
  const target = new Date(targetTime);
  // Kiểm tra xem dữ liệu đầu vào có hợp lệ không
  if (!(now instanceof Date) || !(target instanceof Date)) {
    return "Invalid date";
  }
  // Tính số mili giây cách biệt
  const difference = now.getTime() - target.getTime();
  const differenceInMinutes = Math.floor(difference / (1000 * 60));
  if (differenceInMinutes < 60) {
    console.log(differenceInMinutes);
    return `${differenceInMinutes} phút trước`;
  }

  // Chuyển đổi từ mili giây thành giờ
  const differenceInHours = Math.floor(difference / (1000 * 60 * 60));
  // Xử lý các trường hợp đặc biệt
  if (differenceInHours < 24) {
    return `${differenceInHours} giờ trước`;
  } else if (differenceInHours < 24 * 7) {
    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays} ngày trước`;
  } else if (differenceInHours < 24 * 30) {
    // Cách 1 tháng
    const differenceInMonths = Math.floor(differenceInHours / (24 * 30));
    return `${differenceInMonths} tháng trước`;
  } else if (differenceInHours < 24 * 7) {
    // Cách 1 tuần
    const differenceInWeeks = Math.floor(differenceInHours / (24 * 7));
    return `${differenceInWeeks} tuần trước`;
  } else if (differenceInHours < 24 * 365) {
    // Cách 1 năm
    const differenceInYears = Math.floor(differenceInHours / (24 * 365));
    return `${differenceInYears} năm trước`;
  } else {
    return "cách rất lâu";
  }
}
