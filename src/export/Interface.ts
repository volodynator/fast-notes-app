import type {Settings} from "../model/Types";
import type {Model} from "../model";

export interface Exporter {
    exportSettings(settings: Settings): boolean;
    exportTasks(model: Model): boolean;
}