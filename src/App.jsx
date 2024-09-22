import "./App.css";
import Fish from "./Fish";
import { FishTank } from "./FishTank";
import Tank from "./Tank.jsx";

export default function App() {
    return(
        <div className="scene">
            <div className="scene__feeder">
                Feeder
            </div>
            <div className="scene__tank">
                Tank
                <div>
                    <Tank />

                </div>
            </div>
        </div>
    )
}