import "./App.css";
import Fish from "./Fish";
import { FishTank } from "./FishTank";
import Feeder from "./components/feeder/Feeder.jsx";

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