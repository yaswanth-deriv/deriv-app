declare module '@enykeev/react-virtualized/dist/es/' {
    export type IndexRange = {
        startIndex: number;
        stopIndex: number;
    };
    export type Index = {
        index: number;
    };
    export type InfiniteLoaderChildProps = {
        onRowsRendered: (params: IndexRange) => void;
        registerChild: (registeredChild: any) => void;
    };

    export type InfiniteLoader = {
        children: (props: InfiniteLoaderChildProps) => React.ReactNode;
        isRowLoaded: (params: Index) => boolean;
        loadMoreRows: (params: IndexRange) => Promise<any>;
        minimumBatchSize?: number | undefined;
        rowCount?: number | undefined;
        threshold?: number | undefined;
        [key: string]: any;
    };

    export const InfiniteLoader = ({
        children,
        isRowLoaded,
        loadMoreRows,
        minimumBatchSize,
        rowCount,
        threshold,
    }: InfiniteLoader): JSX.Element => React.ReactNode;

    export default InfiniteLoader;
}
