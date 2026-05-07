export default function DotsLoader({ color = '#ff5454', size = 4, gap = 6 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            animation: `bounce 0.6s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-${size * 1.5}px); }
        }
      `}</style>
    </div>
  );
}
