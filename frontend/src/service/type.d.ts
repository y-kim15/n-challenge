interface IRecord {
    id: string;
    url: string;
    created: string;
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
