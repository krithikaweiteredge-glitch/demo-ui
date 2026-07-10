export default function PlaceholderPage({ icon, title, description }) {
  return (
    <div className="page-content">
      <div className="placeholder-page">
        <div className="ph-icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
