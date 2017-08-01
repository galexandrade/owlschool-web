export class ClassRoom{
    id;
    name: string;
    period: string;
    picture: string;
    classRoomTeacherMatters: any[];
    schedule: {_links: any}[];

    mainTeacher: string;
    _links: any;
}