
export class Fork {
    owner: Owner;
    id: number;
    html_url: string;
    full_name: string;
    description?: string; // Optional property
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    license?: { name: string }; // Optional property
    licenseName: string;
    ownerLogin: string;

    constructor(
        owner: Owner,
        id: number,
        html_url: string,
        full_name: string,
        description: string | undefined,
        stargazers_count: number,
        forks_count: number,
        updated_at: string,
        license?: { name: string }
    ) {
        this.owner = owner;
        this.ownerLogin = owner.login;
        this.licenseName = license?.name || 'No License';
        this.id = id;
        this.html_url = html_url;
        this.full_name = full_name;
        this.description = description;
        this.stargazers_count = stargazers_count;
        this.forks_count = forks_count;
        this.updated_at = updated_at;
        this.license = license;
    }
}

export class Owner {
    login: string;
    avatar_url: string;
    id: number;
    constructor(login: string, id: number) {
        this.login = login;
        this.id = id;
        this.avatar_url = `https://avatars.githubusercontent.com/u/${id}`;
    }
}

