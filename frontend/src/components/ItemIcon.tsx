import './../styles/ItemIcon.css';


function ItemIcon(props: { icon: string, name: string, onClick: () => void }) {
    const iconName = props.name;
    const icon = props.icon;
    const onClick = props.onClick;

    return (
        <div
            className={iconName}
            style={{ backgroundImage: `url('${icon}')` }}
            onClick={onClick}
        >
        </div>
    );
}

export default ItemIcon;