import "./common.css";

type Props = {
    text: string;
};

export default function StatusBadge({ text }: Props) {
    const getStatusClass = (status: string) => {
        switch (status) {
            case "OPEN":
                return "badge-open";
            case "MITIGATED":
                return "badge-mitigated";
            case "RESOLVED":
                return "badge-resolved";
            default:
                return "badge-default";
        }
    };

    return <span className={`badge ${getStatusClass(text)}`}>{text}</span>;
}