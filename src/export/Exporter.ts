import type {Exporter} from "./Interface.ts";
import type {Settings} from "../model/Types";
import type {Model} from "../model";

export class ExporterImpl implements Exporter {
    public exportSettings(settings: Settings): boolean {
        if (settings) {
            return true;
        }
        return false;
    }

    public exportTasks(model: Model): boolean {
        if (model) {
            return true;
        }
        return false;
    }

}