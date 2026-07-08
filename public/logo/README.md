# Logo Assets

Drop the official KRYPTA 2026 logo PNG files here from the Google Drive folder:
https://drive.google.com/drive/folders/1XnUh6TlFYlHJhaT3rsymK3CjK_-6lnao

## Required filenames

| File | Usage |
|---|---|
| `krypta-logo-dark.png` | Full logo on dark backgrounds (used in OG image, manifest) |
| `krypta-logo-light.png` | Full logo on light backgrounds |
| `krypta-icon-192.png` | PWA icon (192×192) |
| `krypta-icon-512.png` | PWA icon (512×512) |
| `krypta-logo-dark.png` | Used in JSON-LD Organization schema |

## Usage in code

```tsx
import Image from "next/image";

// Auto-switches based on theme class
<Image
  src="/logo/krypta-logo-dark.png"
  alt="KRYPTA 2026"
  width={160}
  height={40}
  className="block dark:hidden"
/>
<Image
  src="/logo/krypta-logo-light.png"
  alt="KRYPTA 2026"
  width={160}
  height={40}
  className="hidden dark:block"
/>
```
