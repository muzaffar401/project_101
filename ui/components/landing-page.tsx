"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Sparkles, 
  Heart, 
  Dumbbell, 
  Apple, 
  Shield, 
  Zap, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  TrendingUp,
  Target,
  Clock
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Personalized Health Plans",
    description: "AI-powered recommendations tailored to your unique health goals and lifestyle.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    title: "Smart Workout Planning",
    description: "Adaptive fitness routines that evolve with your progress and preferences.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Apple className="h-6 w-6" />,
    title: "Nutrition Guidance",
    description: "Expert meal planning with dietary restrictions and health conditions in mind.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Injury Prevention",
    description: "Specialized support for injury recovery and prevention strategies.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-time Coaching",
    description: "Instant feedback and motivation to keep you on track with your goals.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Progress Tracking",
    description: "Comprehensive analytics to monitor your health journey and celebrate wins.",
    color: "from-indigo-500 to-purple-500"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "This AI coach transformed my approach to wellness. The personalized plans actually work!",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Mike Chen",
    role: "Busy Professional",
    content: "Finally, a health app that understands my schedule and limitations. Game changer!",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emma Davis",
    role: "New Mom",
    content: "The injury support helped me get back to fitness safely after pregnancy. Amazing!",
    rating: 5,
    avatar: "ED"
  }
];

const stats = [
  { number: "10K+", label: "Active Users", icon: <Users className="h-5 w-5" /> },
  { number: "95%", label: "Success Rate", icon: <Target className="h-5 w-5" /> },
  { number: "24/7", label: "AI Support", icon: <Clock className="h-5 w-5" /> },
  { number: "50+", label: "Health Goals", icon: <Star className="h-5 w-5" /> }
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-400/10 rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-400/10 rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-400/10 rounded-full animate-float" style={{ animationDelay: '-1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <Badge className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-glow">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Wellness Revolution
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">Transform Your Health</span>
              <br />
              <span className="text-foreground">with AI Precision</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet your personal AI wellness coach that understands your unique needs, 
              adapts to your lifestyle, and guides you to achieve lasting health transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="gradient-bg hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl button-glow group animate-glow"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 hover:bg-primary/5 group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-primary/5 to-emerald-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center space-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="gradient-text">Powerful Features</span> for Your Wellness
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered platform revolutionizes your health journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="glass-card border-0 card-hover group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} p-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple, intelligent onboarding process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Goals",
                description: "Tell us about your health objectives, preferences, and any limitations.",
                icon: <Target className="h-8 w-8" />
              },
              {
                step: "02", 
                title: "Get Your Plan",
                description: "Receive a personalized wellness plan crafted by our AI specialists.",
                icon: <Sparkles className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Follow your journey with real-time insights and adaptive recommendations.",
                icon: <TrendingUp className="h-8 w-8" />
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className="text-center space-y-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="w-20 h-20 mx-auto rounded-full gradient-bg flex items-center justify-center text-white shadow-2xl animate-glow">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from people who transformed their health with our AI coach
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="glass-card border-0 card-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to <span className="gradient-text">Transform</span> Your Health?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have already started their wellness journey with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="gradient-bg hover:opacity-90 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl button-glow group animate-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Start in 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}