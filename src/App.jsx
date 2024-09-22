import "./App.css";
import Feeder from "./components/feeder/Feeder.jsx";
import { FishTank } from "./components/fish/FishTank.jsx";

export default function App() {
    return(
        <div className="scene">
            <div className="scene__feeder">
                <Feeder />
            </div>
            <div className="scene__tank">
                <FishTank/>
            </div>
        </div>
    )
}