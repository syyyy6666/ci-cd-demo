import { useEffect, useState } from 'react';

const VERSION = import.meta.env.VITE_APP_VERSION ?? '1.0.0';

export default function App() {
  const [message, setMessage] = useState('加载中…');
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data: { message: string }) => {
        setMessage(data.message);
        setOk(true);
      })
      .catch(() => {
        setMessage('后端接口不可用（本地开发请先启动 backend）');
        setOk(false);
      });
  }, []);

  return (
    <main className="card">
      <h1>CI/CD 自动化演示</h1>
      <p className="subtitle">Lab 11 · React + Vite 前端，Nginx 托管，Node 后端提供接口</p>
      <dl>
        <dt>前端版本</dt>
        <dd data-testid="version">v{VERSION}</dd>
        <dt>后端响应</dt>
        <dd data-testid="message" className={ok === false ? 'error' : ''}>
          {message}
        </dd>
        <dt>健康检查</dt>
        <dd>
          <a href="/health">/health</a> · <a href="/api/version">/api/version</a>
        </dd>
      </dl>
    </main>
  );
}
