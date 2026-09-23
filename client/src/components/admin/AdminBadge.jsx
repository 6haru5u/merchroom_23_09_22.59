export default function AdminBadge({ status }) { return <span className={`badge ${String(status || '').toLowerCase()}`}>{status || 'pending'}</span>; }
