function formatNumberWithM(value) {
  if (value >= 1_000_000) {
    return new Intl.NumberFormat('en-US').format((value / 1_000_000).toFixed(1)) + 'M';
  } else {
    return new Intl.NumberFormat('en-US').format(value);
  }
}
