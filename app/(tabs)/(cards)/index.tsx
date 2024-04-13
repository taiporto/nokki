import { View, Text, Button } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";
import { Link } from "expo-router";

export default function AllCollections() {
  return (
    <View>
      <Text>All collections</Text>
      <Link href={"/createCollection"} asChild>
        <Button icon={Plus}>Criar coleção</Button>
      </Link>
    </View>
  );
}
