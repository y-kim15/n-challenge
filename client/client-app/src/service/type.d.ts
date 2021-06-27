interface IRecord {
    id: string;
    url: string;
    created: Date;
    output: string;
}

interface ISession {}
type ContextType = {
    token: string;
    //login: () => void;
    previousRecords: IRecord[];
};

type TableProps = {
    results: IRecord[];
};

type SearchProps = {
    handleNewSearch: (IRecord) => void;
};
