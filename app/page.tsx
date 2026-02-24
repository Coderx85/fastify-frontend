import ProductForm from "@/components/ProductForm";
import { features } from "@/constants";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[70vh] p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 60V0h60v60h-4V4H4v56H0zm4-4h52V8H8v48h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-16 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-down">
            The Future of E-commerce is Here
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 animate-fade-in-up delay-200">
            A powerful, flexible, and beautiful platform to build and scale your
            online business.
          </p>
          <button className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 animate-fade-in-up delay-400">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is packed with features to help you launch, manage, and
            grow your business.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-card text-card-foreground rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-muted">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">See It in Action</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Try adding a product yourself with our interactive form component.
            </p>
          </div>
          <div className="mt-8 max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-lg">
            <ProductForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
