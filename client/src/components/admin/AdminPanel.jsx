export default function AdminPanel({ title, children, action }) { return <section className="admin-panel"><div className="panel-heading"><h2>{title}</h2>{action}</div>{children}</section>; }
