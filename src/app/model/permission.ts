export class Permission {
    canCreateEvent: boolean;
    canCreateNews: boolean;
    canChat: boolean;
    canUpdateSchool: boolean;
    canUpdateStudent: boolean;
    canCreateStudent: boolean;
    canUpdateClass: boolean;
    canCreateClass: boolean;

    constructor(canCreateEvent?: boolean,
                canCreateNews?: boolean,
                canChat?: boolean,
                canUpdateSchool?: boolean,
                canUpdateStudent?: boolean,
                canCreateStudent?: boolean,
                canUpdateClass?: boolean,
                canCreateClass?: boolean
                ){
        this.canCreateEvent = canCreateEvent ? canCreateEvent : false;
        this.canCreateNews = canCreateNews ? canCreateNews : false;
        this.canChat = canChat ? canChat : false;
        this.canUpdateSchool = canUpdateSchool ? canUpdateSchool : false;
        this.canUpdateStudent = canUpdateStudent ? canUpdateStudent : false;
        this.canCreateStudent = canCreateStudent ? canCreateStudent : false;
        this.canUpdateClass = canUpdateClass ? canUpdateClass : false;
        this.canCreateClass = canCreateClass ? canCreateClass : false;

    }
}