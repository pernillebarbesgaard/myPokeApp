import "../css/root.css"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function App() {
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/gen1" className={location.pathname.includes("gen1") || !location.pathname.includes("gen") ? "active" : ""}>Gen 1</Link></li>
          <li><Link to="/gen2" className={location.pathname.includes("gen2") ? "active" : ""}>Gen 2</Link></li>
          <li><Link to="/gen3" className={location.pathname.includes("gen3") ? "active" : ""}>Gen 3</Link></li>
          <li><Link to="/gen4" className={location.pathname.includes("gen4") ? "active" : ""}>Gen 4</Link></li>
          <li><Link to="/gen5" className={location.pathname.includes("gen5") ? "active" : ""}>Gen 5</Link></li>
          <li><Link to="/gen6" className={location.pathname.includes("gen6") ? "active" : ""}>Gen 6</Link></li>
          <li><Link to="/gen7" className={location.pathname.includes("gen7") ? "active" : ""}>Gen 7</Link></li>
          <li><Link to="/gen8" className={location.pathname.includes("gen8") ? "active" : ""}>Gen 8</Link></li>
          <li><Link to="/gen9" className={location.pathname.includes("gen9") ? "active" : ""}>Gen 9</Link></li>
        </ul>
      </nav>
      <Outlet/>
      
    </>
  );
}