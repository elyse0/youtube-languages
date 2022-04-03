import { MongoService } from '@elyse0/mongo-service';

class BlacklistChecker {
    private readonly database: MongoService;

    private readonly collection: string;

    constructor(database: MongoService, collection: string) {
        this.database = database;
        this.collection = collection;
    }

    public async getMatches(text: string): Promise<string[]> {
        const matches = await this.database.find(this.collection, {
            $text: {
                $search: text,
                $diacriticSensitive: true,
            },
        });

        return matches.map((item) => (item as {_id: string})._id).sort();
    }

    public async isTextValid(text: string): Promise<boolean> {
        const matches = await this.getMatches(text);
        return !matches.length;
    }
}

export default BlacklistChecker;
