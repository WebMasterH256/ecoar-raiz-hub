import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EcoarLogo } from "@/components/EcoarLogo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { activities as initialActivities, Activity, ActivityCategory } from "@/lib/mock-data";
import { Users, Calendar, Sprout, TrendingUp, BarChart3, Target, FileText, ArrowLeft, Plus, Activity as ActivityIcon, MapPin, AlignLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Gestão ECOAR — Coordenação" }] }),
  component: Admin,
});

interface Goal {
  id: string;
  title: string;
  progress: number;
  status: string;
}

function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [localActivities, setLocalActivities] = useState<Activity[]>(initialActivities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    title: "",
    category: "Evento",
    date: "",
    capacity: 0,
    raiz: 0,
    location: "",
    description: "",
    status: "Em Breve",
  });

  const [localGoals, setLocalGoals] = useState<Goal[]>([
    { id: "1", title: "3.000 famílias cadastradas", progress: 80, status: "Em andamento" },
    { id: "2", title: "100 hortas comunitárias ativas", progress: 85, status: "Em andamento" },
    { id: "3", title: "30 toneladas de desperdício reduzido", progress: 60, status: "Atenção" },
    { id: "4", title: "20 cozinhas integradas à rede", progress: 60, status: "Em andamento" },
  ]);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    progress: 0,
    status: "Em andamento",
  });

  const handleAddGoal = () => {
    if (!newGoal.title) {
      toast.error("Por favor, preencha o título da meta.");
      return;
    }

    const goal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoal.title as string,
      progress: Number(newGoal.progress) || 0,
      status: newGoal.status || "Em andamento",
    };

    setLocalGoals([...localGoals, goal]);
    setIsGoalDialogOpen(false);
    setNewGoal({ title: "", progress: 0, status: "Em andamento" });
    toast.success("Meta cadastrada com sucesso!");
  };

  const handleAddActivity = () => {
    if (!newActivity.title || !newActivity.date) {
      toast.error("Por favor, preencha o título e a data.");
      return;
    }

    const activity: Activity = {
      id: `a${localActivities.length + 1}`,
      title: newActivity.title as string,
      category: (newActivity.category as ActivityCategory) || "Evento",
      date: newActivity.date as string,
      capacity: Number(newActivity.capacity) || 0,
      raiz: Number(newActivity.raiz) || 0,
      location: newActivity.location || "Arcoverde - PE",
      description: newActivity.description || "",
      status: "Em Breve",
      enrolled: 0,
      address: newActivity.location || "Arcoverde - PE",
      mapsUrl: "",
    };

    setLocalActivities([activity, ...localActivities]);
    setIsDialogOpen(false);
    setNewActivity({
      title: "",
      category: "Evento",
      date: "",
      capacity: 0,
      raiz: 0,
      location: "",
      description: "",
      status: "Em Breve",
    });
    toast.success("Atividade cadastrada com sucesso!");
  };

  useEffect(() => {
    async function checkAccess() {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      const isAdminDemo = window.sessionStorage?.getItem("ecoar_admin_demo") === "1";
      const isCoord = isAdminDemo || user?.email?.endsWith(".admin") || user?.email === "coordenacao@ecoar.app";

      if (!isCoord) {
        navigate({ to: "/auth" });
        return;
      }

      setLoading(false);
    }

    checkAccess();
  }, [navigate]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <EcoarLogo size={42} tagline />
            <Badge className="bg-foreground text-background">Coordenação</Badge>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">Coordenação ECOAR</p>
            <p className="text-xs text-muted-foreground">coordenacao@ecoar.admin</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-extrabold">Painel da Gestão</h1>
          <p className="mt-1 text-muted-foreground">Inteligência operacional do programa ECOAR — Prefeitura de Arcoverde.</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-card border border-border h-12 rounded-full p-1">
            <TabsTrigger value="dashboard" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-5">Dashboard</TabsTrigger>
            <TabsTrigger value="atividades" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-5">Atividades</TabsTrigger>
            <TabsTrigger value="metas" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-5">Metas</TabsTrigger>
            <TabsTrigger value="relatorios" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-5">Relatórios</TabsTrigger>
            <TabsTrigger value="logs" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold px-5">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { l: "Total de cidadãos", v: "2.412", d: "+184 este mês", icon: Users },
                { l: "Inscrições ativas", v: "1.087", d: "+12% vs mês ant.", icon: Calendar },
                { l: "sementes distribuídas", v: "84.520", d: "+8.420 este mês", icon: Sprout },
                { l: "Atividades em curso", v: localActivities.length.toString(), d: "5 esta semana", icon: ActivityIcon },
              ].map(s => (
                <Card key={s.l} className="border-border/60 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft"><s.icon className="h-5 w-5 text-primary" /></div>
                    <Badge variant="outline" className="border-success text-success">{s.d}</Badge>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</p>
                  <p className="mt-1 font-display text-3xl font-extrabold">{s.v}</p>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2 border-border/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">Engajamento mensal</h3>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="flex h-56 items-end gap-3">
                  {[40, 65, 50, 80, 72, 95, 88, 110, 125, 140, 160, 175].map((h, i) => (
                    <div key={i} className="flex-1">
                      <div className="ecoar-gradient rounded-t-lg" style={{ height: `${h}px` }} />
                      <p className="mt-2 text-center text-[10px] font-semibold text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="border-border/60 p-6">
                <h3 className="font-display text-lg font-bold">Top bairros</h3>
                <div className="mt-4 space-y-4">
                  {[{ n: "Centro", p: 92 }, { n: "São Cristóvão", p: 78 }, { n: "Boa Vista", p: 64 }, { n: "Capoeiras", p: 51 }, { n: "Universitário", p: 45 }].map(b => (
                    <div key={b.n}>
                      <div className="flex justify-between text-sm"><span className="font-semibold">{b.n}</span><span className="text-muted-foreground">{b.p}%</span></div>
                      <Progress value={b.p} className="mt-1 h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="atividades" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{localActivities.length} atividades cadastradas</p>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Button onClick={() => setIsDialogOpen(true)} className="rounded-full bg-primary text-primary-foreground font-semibold shadow-elegant">
                  <Plus className="mr-2 h-4 w-4" /> Nova Atividade
                </Button>
                <DialogContent className="max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl font-bold text-primary flex items-center gap-2">
                      <Calendar className="h-6 w-6" /> Nova Atividade
                    </DialogTitle>
                    <DialogDescription>
                      Cadastre uma nova atividade para a comunidade participar.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-semibold">Título da Atividade</Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: Mutirão de Limpeza do Rio" 
                        className="rounded-xl border-border/50 h-11"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-semibold">Categoria</Label>
                        <Select 
                          value={newActivity.category} 
                          onValueChange={(v) => setNewActivity({...newActivity, category: v as ActivityCategory})}
                        >
                          <SelectTrigger className="rounded-xl border-border/50 h-11">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Evento">Evento</SelectItem>
                            <SelectItem value="Oficina">Oficina</SelectItem>
                            <SelectItem value="Distribuição">Distribuição</SelectItem>
                            <SelectItem value="Mutirão">Mutirão</SelectItem>
                            <SelectItem value="Colheita">Colheita</SelectItem>
                            <SelectItem value="Reciclagem">Reciclagem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-semibold">Data e Hora</Label>
                        <Input 
                          id="date" 
                          placeholder="Ex: 19 mai 2026" 
                          className="rounded-xl border-border/50 h-11"
                          value={newActivity.date}
                          onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="raiz" className="text-sm font-semibold text-primary">Sementes (Raiz)</Label>
                        <div className="relative">
                          <Sprout className="absolute left-3 top-3 h-5 w-5 text-primary" />
                          <Input 
                            id="raiz" 
                            type="number" 
                            className="pl-10 rounded-xl border-border/50 h-11"
                            value={newActivity.raiz}
                            onChange={(e) => setNewActivity({...newActivity, raiz: parseInt(e.target.value) || 0})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-sm font-semibold">Capacidade</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input 
                            id="capacity" 
                            type="number" 
                            className="pl-10 rounded-xl border-border/50 h-11"
                            value={newActivity.capacity}
                            onChange={(e) => setNewActivity({...newActivity, capacity: parseInt(e.target.value) || 0})}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-semibold">Localização</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input 
                          id="location" 
                          placeholder="Ex: Praça Dom Vital — Centro" 
                          className="pl-10 rounded-xl border-border/50 h-11"
                          value={newActivity.location}
                          onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-semibold">Descrição</Label>
                      <div className="relative">
                        <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Textarea 
                          id="description" 
                          placeholder="Descreva a atividade..." 
                          className="pl-10 rounded-xl border-border/50 min-h-[80px] pt-3"
                          value={newActivity.description}
                          onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-full h-11">Cancelar</Button>
                    <Button onClick={handleAddActivity} className="rounded-full bg-primary text-primary-foreground h-11 px-8 font-bold">Cadastrar Atividade</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="border-border/60 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="px-5 py-3 text-left">Atividade</th><th className="px-5 py-3 text-left">Categoria</th><th className="px-5 py-3 text-left">Data</th><th className="px-5 py-3 text-left">Inscritos</th><th className="px-5 py-3 text-left">sementes</th><th className="px-5 py-3 text-right">Ações</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {localActivities.map(a => (
                    <tr key={a.id} className="hover:bg-secondary/40">
                      <td className="px-5 py-4 font-semibold">{a.title}</td>
                      <td className="px-5 py-4"><Badge variant="outline" className="border-primary/30 text-xs">{a.category}</Badge></td>
                      <td className="px-5 py-4 text-muted-foreground">{a.date}</td>
                      <td className="px-5 py-4">{a.enrolled}/{a.capacity}</td>
                      <td className="px-5 py-4 font-bold text-primary">+{a.raiz}</td>
                      <td className="px-5 py-4 text-right"><button className="text-primary text-xs font-bold hover:underline">Editar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="metas" className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Metas institucionais 2026</p>
              
              <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
                <Button onClick={() => setIsGoalDialogOpen(true)} className="rounded-full bg-primary text-primary-foreground font-semibold shadow-elegant">
                  <Plus className="mr-2 h-4 w-4" /> Nova Meta
                </Button>
                <DialogContent className="max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="font-display text-2xl font-bold text-primary flex items-center gap-2">
                      <Target className="h-6 w-6" /> Nova Meta
                    </DialogTitle>
                    <DialogDescription>
                      Cadastre uma nova meta institucional para o programa ECOAR.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-title" className="text-sm font-semibold">Título da Meta</Label>
                      <Input 
                        id="goal-title" 
                        placeholder="Ex: 5.000 famílias cadastradas" 
                        className="rounded-xl border-border/50 h-11"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="goal-progress" className="text-sm font-semibold">Progresso Inicial (%)</Label>
                        <Input 
                          id="goal-progress" 
                          type="number" 
                          min="0"
                          max="100"
                          className="rounded-xl border-border/50 h-11"
                          value={newGoal.progress}
                          onChange={(e) => setNewGoal({...newGoal, progress: parseInt(e.target.value) || 0})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal-status" className="text-sm font-semibold">Status</Label>
                        <Select 
                          value={newGoal.status} 
                          onValueChange={(v) => setNewGoal({...newGoal, status: v})}
                        >
                          <SelectTrigger className="rounded-xl border-border/50 h-11">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Em andamento">Em andamento</SelectItem>
                            <SelectItem value="Atenção">Atenção</SelectItem>
                            <SelectItem value="Concluída">Concluída</SelectItem>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)} className="rounded-full h-11">Cancelar</Button>
                    <Button onClick={handleAddGoal} className="rounded-full bg-primary text-primary-foreground h-11 px-8 font-bold">Cadastrar Meta</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {localGoals.map((m) => (
                <Card key={m.id} className="border-border/60 p-6">
                  <div className="flex items-start justify-between">
                    <Target className="h-6 w-6 text-primary" />
                    <Badge className={m.status === "Atenção" ? "bg-warning text-foreground" : m.status === "Concluída" ? "bg-success text-white" : "bg-primary-soft text-primary"}>
                      {m.status}
                    </Badge>
                  </div>
                  <p className="mt-4 font-display text-lg font-bold">{m.title}</p>
                  <Progress value={m.progress} className="mt-4 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">{m.progress}% concluído</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="relatorios" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {["Crescimento de usuários", "Participação por bairro", "Distribuição de sementes", "Atividades populares", "Evolução do ranking", "Engajamento mensal"].map(r => (
                <Card key={r} className="border-border/60 p-6 hover:shadow-elegant transition-shadow cursor-pointer">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <p className="mt-4 font-display text-lg font-bold">{r}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Gerar PDF · CSV</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <Card className="border-border/60 divide-y divide-border">
              {[
                { u: "Coordenação", a: "criou atividade Mutirão de Limpeza do Rio", t: "há 2 horas" },
                { u: "Coordenação", a: "atualizou meta Famílias cadastradas", t: "há 5 horas" },
                { u: "Coordenação", a: "liberou sementes para 23 cidadãos", t: "ontem" },
                { u: "Coordenação", a: "encerrou inscrições da Oficina de Compostagem", t: "há 2 dias" },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-4 p-5 text-sm">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="flex-1"><strong>{l.u}</strong> {l.a}</p>
                  <span className="text-xs text-muted-foreground">{l.t}</span>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
