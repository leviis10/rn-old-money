import GetWalletResponse from "../../models/wallets/response/GetWalletResponse";
import WalletItem from "./WalletItem";

interface WalletListProps {
    wallets: GetWalletResponse[];
}

function WalletList({ wallets }: WalletListProps) {
    return wallets.map((wallet) => <WalletItem key={wallet.id} wallet={wallet} />);
}

export default WalletList;
