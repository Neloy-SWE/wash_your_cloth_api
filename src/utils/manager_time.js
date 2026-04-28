const getExpirationTime = (durationStr) => {
  const match = durationStr.match(/^(\d+)([smhd])$/);
  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return new Date(Date.now() + value * multipliers[unit]);
};

export default getExpirationTime;