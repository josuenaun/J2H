// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './ui/components/layout/MainLayout';
import { SmoothScroll } from './ui/components/layout/SmoothScroll';
import { CustomCursor } from './ui/components/common/CustomCursor';

// JOSHUA: Importamos nuestras dos páginas principales
import { Home } from './ui/pages/Home';
import { ProjectDetail } from './ui/pages/ProjectDetail';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />

      <MainLayout>
        {/* JOSHUA: El Enrutador ahora está completamente limpio */}
        <Routes>

          {/* RUTA 1: Si estás en el inicio, renderiza el Home (que ya incluye el logo y las secciones) */}
          <Route path="/" element={<Home />} />

          {/* RUTA 2: Si haces clic en un proyecto, oculta el Home y muestra los detalles */}
          <Route path="/proyecto/:id" element={<ProjectDetail />} />

        </Routes>
      </MainLayout>
    </SmoothScroll>
  );
}

export default App;