# Aura AI: Next-Generation Multi-Model Platform & Sandbox

A premium, highly interactive showcase and playground landing page for advanced AI multimodal engines. Featuring an **Elegant Dark** aesthetic, a simulated live API playground (text, vision, audio, and code), dynamic ROI/operational savings calculators, technical comparison spec sheets, and an automated lead token-minting flow.

---

## 🎨 Visual & Functional Highlights

- **Elegant Dark Theme**: Custom-crafted canvas powered by Tailwind CSS v4, utilizing a deep radial indigo-to-slate gradient background (`#1e1b4b` to `#0a0a0b`), sleek card boundaries with subtle glow accents, and elegant typography pairing.
- **Unified Sandbox Terminal**: Live, simulated API sandbox allowing developers to load presets, configure model parameters (e.g., temperature), and trigger stateful simulations with live streaming logs and sound-wave audio bar animations.
- **Dynamic Savings Metrics**: Integrated real-time ROI calculator showcasing operational efficiency. Sliders instantly contrast estimated manual/agency engineering costs with Aura API platform rates.
- **Enterprise Spec Sheet**: High-fidelity product comparison matrices outlining token limits, region latencies, licensing models, and feature tiers.
- **Interactive Lead Capture**: Stateful validation form that mints unique mockup credentials (`aura_sk_...`) for Sandbox access upon request.
- **Fluid Motion**: Immersive state transitions and responsive animations driven by standard `motion` (Framer Motion).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript 5
- **Build System**: Vite 6
- **Styling**: Tailwind CSS v4 with unified design system utilities
- **Animations**: `motion` (formerly Framer Motion)
- **Icons**: Lucide React (vector-based stroke outline icons)

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally on your machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (installed automatically with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended IDE)

### 1. Installation

Clone or download this repository, navigate to the project root directory, and install the required dependencies:

```bash
# Install NPM packages
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory of your project. You can copy the structure from `.env.example`:

```bash
cp .env.example .env
```

Open the `.env` file and define your keys (the app is safe to run out-of-the-box, but you can configure actual keys here if integrating a backend):

```env
# Gemini API Key (For future server-side AI integrations)
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# App URL Configuration
APP_URL="http://localhost:3000"
```

---

## 💻 Running the App in VS Code

For the ultimate local development experience in **Visual Studio Code**, follow these steps:

### Option A: Using the VS Code Integrated Terminal (Recommended)

1. Open **Visual Studio Code**.
2. Open the project root folder: `File` -> `Open Folder...` (select this project folder).
3. Open the integrated terminal: Go to `Terminal` -> `New Terminal` (or press ``Ctrl + ` `` on Windows/Linux, or ``Cmd + ` `` on macOS).
4. Run the development server command:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the address shown in the terminal (usually `http://localhost:3000`).

### Option B: Using VS Code Task Runner

To launch the app with a single click in VS Code, you can configure a standard Task.

1. In your workspace, create a folder named `.vscode` if it doesn't already exist.
2. Inside `.vscode`, create a file named `tasks.json` with the following content:
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "Run Aura Dev Server",
         "type": "npm",
         "script": "dev",
         "group": {
           "kind": "start",
           "isDefault": true
         },
         "presentation": {
           "reveal": "always",
           "panel": "shared"
         }
       }
     ]
   }
   ```
3. To run it: Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS), type `Run Task`, press `Enter`, and select **Run Aura Dev Server**.

### Recommended VS Code Extensions

For optimal development workflow, we highly recommend installing these extensions:
- **Tailwind CSS IntelliSense** (Provides autocomplete, syntax highlighting, and linting for Tailwind classes).
- **ESLint** & **Prettier** (Ensures clean formatting and code quality).
- **TypeScript Tailwind CSS Plugin** (Improves TS integration with Tailwind classes).

---

## 📦 Build for Production

To compile and optimize the application for production deployment (creates static files in the `dist/` directory):

```bash
# Compile and build assets
npm run build
```

You can preview the built production app locally using:

```bash
# Preview production build
npm run preview
```

---

## 📂 Project Structure

```text
├── .env.example          # Environment variables template
├── .gitignore            # Git exclusion rules
├── index.html            # Main HTML document entry point
├── metadata.json         # Platform configuration & permissions
├── package.json          # Dependencies, metadata, and build scripts
├── tsconfig.json         # TypeScript compiler configurations
├── vite.config.ts        # Vite configuration rules and plug-ins
├── src/
│   ├── main.tsx          # Application entry point mounting React
│   ├── App.tsx           # Primary component containing the UI/Interactive sections
│   ├── index.css         # Tailwind v4 configuration and custom utilities
│   └── components/       # (Optional) Reusable React sub-components
```

---

## 🔒 License

This project is configured as private and proprietary. All rights reserved.
