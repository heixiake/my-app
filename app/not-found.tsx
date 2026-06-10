export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5',
    }}>
      <h1 style={{ fontSize: '4rem', color: '#222' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#555' }}>
        抱歉，您访问的页面不存在。
      </p>
      <a
        href="/"
        style={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          background: '#3182ce',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        返回首页
      </a>
    </div>
  );
}