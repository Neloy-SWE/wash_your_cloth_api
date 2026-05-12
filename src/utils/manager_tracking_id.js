const managerTrakingId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const pick = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const random = Math.floor(1000 + Math.random() * 9000);

    return `ORD-${Date.now()}-${random}-${pick(4)}`;
    // return `ORD-${pick(4)}-${pick(4)}`;
};

export default managerTrakingId;