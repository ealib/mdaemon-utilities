import { ListMember } from './ListMember.ts';

export class MdGrpFile {
    public ADATTRIBUTE = 'mail';
    public ADBASEDN = '';
    public ADBINDFLAGS = 1;
    public ADPAGESIZE = 1000;
    public ADPASSWORD = '';
    public ADSEARCHFILTER = '(&(objectClass=user)(objectCategory=person))';
    public ADSEARCHSCOPE = 2;
    public ADUSERNAME = '';
    public ODBCDSN = '';
    public ODBCDigestQuery = '';
    public ODBCEmailFieldMapping = '';
    public ODBCFirstNameFieldMapping = '';
    public ODBCLastNameFieldMapping = '';
    public ODBCNormalQuery = '';
    public ODBCPass = '';
    public ODBCPostOnlyQuery = '';
    public ODBCReadOnlyQuery = '';
    public ODBCTable = '';
    public ODBCUser = '';
    public allowExpn = false;
    public am = false;
    public archiveDigest = false;
    public authAutoSubscribe = true;
    public authAutoUnsubscribe = false;
    public authSubscribe = true;
    public authUnsubscribe = false;
    public autoPrune = false;
    public crackMessage = true;
    public defaultMode = 'Normal';
    public denyDMARCRejecters = false;
    public description = '';
    public digestMBF = 'DIGEST';
    public eewriteFromDMARC = true;
    public enableDigest = false;
    public enabled = true;
    public forceDigestUse = false;
    public forceUniqueID = true;
    public hideFromAddressBook = false;
    public ignoreRcptErrors = false;
    public informNonMember = false;
    public listName = '';
    public listNameInSubject = false;
    public maxLineCount = 0;
    public maxMembers = 0;
    public maxMessageCount = 0;
    public maxMessageSize = 0;
    public moderated = false;
    public msgTooBigNote = false;
    public nine = false;
    public notificationsTo = '[trash]';
    public passwordPost = false;
    public pm = false;
    public precedenceLevel = 80;
    public private = true;
    public replyAddress = '';
    public replyToEmail = true;
    public replyToList = false;
    public routingLimit = 0;
    public rewriteFromDMARC = true;
    public sendReminders = false;
    public sendStatusMessages = false;
    public six = false;
    public subscribe = false;
    public subscribeNote = false;
    public threadNumbersInSubject = false;
    public three = false;
    public twelve = false;
    public unsubscribe = false;
    public unsubscribeNote = false;
    public useListName = false;
    public useMemberNames = false;
    public useStandardName = true;

    public members: ListMember[] = [];

    public add(...member: ListMember[]) {
        this.members.push(...member);
    }

    public yn(flag: boolean): string {
        return flag ? 'Y' : 'N';
    }

    public toString() {
        const lines = [
            `# Mailing List file`,
            `#`,
            `; ListName = ${this.listName}`,
            `; Description = ${this.description}`,
            `; ReplyAddress = ${this.replyAddress}`,
            `; Enabled = ${this.yn(this.enabled)}`,
            `; Private = ${this.yn(this.private)}`,
            `; SendReminders = ${this.yn(this.sendReminders)}`,
            `; HideFromAddressBook = ${this.yn(this.hideFromAddressBook)}`,
            `; AllowExpn = ${this.yn(this.allowExpn)}`,
            `; ListNameInSubject = ${this.yn(this.listNameInSubject)}`,
            `; RewriteFromDMARC = ${this.yn(this.rewriteFromDMARC)}`,
            `; DenyDMARCRejecters = ${this.yn(this.denyDMARCRejecters)}`,
            `; ThreadNumbersInSubject = ${this.yn(this.threadNumbersInSubject)}`,
            `; UseMemberNames = ${this.yn(this.useMemberNames)}`,
            `; UseListName = ${this.yn(this.useListName)}`,
            `; UseStandardName = ${this.yn(this.useStandardName)}`,
            `; ReplyToList = ${this.yn(this.replyToList)}`,
            `; ReplyToEmail = ${this.yn(this.replyToEmail)}`,
            `; CrackMessage = ${this.yn(this.crackMessage)}`,
            `; ForceUniqueID = ${this.yn(this.forceUniqueID)}`,
            `; IgnoreRcptErrors = ${this.yn(this.ignoreRcptErrors)}`,
            `; SubscribeNote = ${this.yn(this.subscribeNote)}`,
            `; UnsubscribeNote = ${this.yn(this.unsubscribeNote)}`,
            `; MsgTooBigNote = ${this.yn(this.msgTooBigNote)}`,
            `; InformNonMember = ${this.yn(this.informNonMember)}`,
            `; SendStatusMessages = ${this.yn(this.sendStatusMessages)}`,
            `; Moderated = ${this.yn(this.moderated)}`,
            `; PasswordPost = ${this.yn(this.passwordPost)}`,
            `; Subscribe = ${this.yn(this.subscribe)}`,
            `; AuthSubscribe = ${this.yn(this.authSubscribe)}`,
            `; AuthAutoSubscribe = ${this.yn(this.authAutoSubscribe)}`,
            `; Unsubscribe = ${this.yn(this.unsubscribe)}`,
            `; AuthUnsubscribe = ${this.yn(this.authUnsubscribe)}`,
            `; AuthAutoUnsubscribe = ${this.yn(this.authAutoUnsubscribe)}`,
            `; AutoPrune = ${this.yn(this.autoPrune)}`,
            `; EnableDigest = ${this.yn(this.enableDigest)}`,
            `; ForceDigestUse = ${this.yn(this.forceDigestUse)}`,
            `; ArchiveDigest = ${this.yn(this.archiveDigest)}`,
            `; Nine = ${this.yn(this.nine)}`,
            `; Twelve = ${this.yn(this.twelve)}`,
            `; Three = ${this.yn(this.three)}`,
            `; Six = ${this.yn(this.six)}`,
            `; AM = ${this.yn(this.am)}`,
            `; PM = ${this.yn(this.pm)}`,
            `; DigestMBF = ${this.digestMBF}`,
            `; Notifications-To = ${this.notificationsTo}`,
            `; RoutingLimit = ${this.routingLimit}`,
            `; MaxMessageSize = ${this.maxMessageSize}`,
            `; PrecedenceLevel = ${this.precedenceLevel}`,
            `; MaxMembers = ${this.maxMembers}`,
            `; MaxMessageCount = ${this.maxMessageCount}`,
            `; MaxLineCount = ${this.maxLineCount}`,
            `; ODBCDSN = ${this.ODBCDSN}`,
            `; ODBCUser = ${this.ODBCUser}`,
            `; ODBCPass = ${this.ODBCPass}`,
            `; ODBCTable = ${this.ODBCTable}`,
            `; ODBCEmailFieldMapping = ${this.ODBCEmailFieldMapping}`,
            `; ODBCFirstNameFieldMapping = ${this.ODBCFirstNameFieldMapping}`,
            `; ODBCLastNameFieldMapping = ${this.ODBCLastNameFieldMapping}`,
            `; ODBCReadOnlyQuery = ${this.ODBCReadOnlyQuery}`,
            `; ODBCPostOnlyQuery = ${this.ODBCPostOnlyQuery}`,
            `; ODBCNormalQuery = ${this.ODBCNormalQuery}`,
            `; ODBCDigestQuery = ${this.ODBCDigestQuery}`,
            `; ADBASEDN = ${this.ADBASEDN}`,
            `; ADSEARCHFILTER = ${this.ADSEARCHFILTER}`,
            `; ADATTRIBUTE = ${this.ADATTRIBUTE}`,
            `; ADUSERNAME = ${this.ADUSERNAME}`,
            `; ADBINDFLAGS = ${this.ADBINDFLAGS}`,
            `; ADSEARCHSCOPE = ${this.ADSEARCHSCOPE}`,
            `; ADPAGESIZE = ${this.ADPAGESIZE}`,
            `; ADPASSWORD = ${this.ADPASSWORD}`,
            `; DefaultMode = ${this.defaultMode}`,
            ''
        ];

        this.members.forEach((member) => lines.push(member.toString()));

        return lines.join('\n');
    }
}