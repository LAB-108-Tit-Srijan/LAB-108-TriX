export default function Footer() {
  return (
    <footer
      className="py-10"
      style={{
        background: '#E4E0D9',
        borderTop: '1px solid rgba(217, 209, 190, 0.6)',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="TriPOV Logo" className="h-8 w-auto object-contain" />
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          {['Privacy', 'Terms', 'Support', 'About'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-light transition-colors duration-200 hover:text-nature-blue"
              style={{ color: '#6B7280' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs font-light" style={{ color: '#9CA3AF' }}>
          © 2024 TriPOV. A cinematic travel experience.
        </p>
      </div>
    </footer>
  );
}
