import {makeAutoObservable} from "mobx";
import {Reminder} from "@/types";


class RemindersStore {
    reminders: Reminder[] = []
    constructor() {
        makeAutoObservable(this);
    }
}

const remindersStore = new RemindersStore();
export default remindersStore;