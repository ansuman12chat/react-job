// Its gonna take childern the background color as a prop, if not passed it will take the default value of bg-gray-100

const Card = ({ children, bg = 'bg-gray-100' }) => {
    return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
  };
  export default Card;