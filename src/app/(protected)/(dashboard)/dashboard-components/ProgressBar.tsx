type ProgressBarProps = {
    bgcolor: string;
    progress: number;
};
const ProgressBar = ({ bgcolor, progress }: ProgressBarProps) => {
    const Parentdiv = {
        height: "4px",
        width: "100%",
        backgroundColor: "#EBECEC",
        marginTop: "10px",
        borderRadius: "4px"
    };

    const Childdiv = {
        height: "100%",
        width: `${progress}%`,
        backgroundColor: bgcolor,
        transition: "width 1s linear",
        borderRadius: "4px"
    };

    return (
        <div style={Parentdiv}>
            <div style={Childdiv} />
        </div>
    );
};

export default ProgressBar;