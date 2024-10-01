export class Owner {
    constructor(
      public login: string,
      public avatar_url: string
    ) {}
}
  
export class Fork {
constructor(
    public id: number,
    public full_name: string,
    public html_url: string,
    public owner: Owner,
    public description: string | null,
    public stargazers_count: number,
    public forks_count: number,
    public updated_at: string,
    public license?: { name: string } | null
) {}
}
  