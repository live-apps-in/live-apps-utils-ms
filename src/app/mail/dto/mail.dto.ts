export class MailDto{
	constructor(
        public readonly to: string,
        public readonly context: Object,
        public readonly subject?: string,
        public readonly template?: string,
	){}
}

export class MailReqEvent{
    	constructor(
        public readonly to: string,
        public readonly context: Object,
        public readonly type: string,
	){}
}