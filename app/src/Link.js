export default function Link({ src, children }) {
  return (
    <a href={src} target="_self" rel="noopener noreferrer">
      {children}
    </a>
  );
}
