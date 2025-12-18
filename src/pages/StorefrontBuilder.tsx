import { useState } from 'react';
import { Store, Palette, Image, Type, Layout, Save, Eye, Sparkles, CheckCircle, Link as LinkIcon, Tag } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const templates = [
  {
    id: 1,
    name: 'Elegant Boutique',
    preview: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perfect for fashion and clothing stores'
  },
  {
    id: 2,
    name: 'Artisan Crafts',
    preview: 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Showcase handmade products beautifully'
  },
  {
    id: 3,
    name: 'Fresh Market',
    preview: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Ideal for food and organic products'
  },
  {
    id: 4,
    name: 'Beauty & Wellness',
    preview: 'https://images.pexels.com/photos/3738387/pexels-photo-3738387.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perfect for cosmetics and spa services'
  }
];

const colorThemes = [
  { name: 'Rose Pink', colors: ['#FFE4E1', '#FFC0CB', '#FF69B4'] },
  { name: 'Lavender', colors: ['#E6E6FA', '#DDA0DD', '#BA55D3'] },
  { name: 'Mint Green', colors: ['#F0FFF0', '#98FB98', '#3CB371'] },
  { name: 'Coral', colors: ['#FFF5EE', '#FF7F50', '#FF6347'] }
];

export function StorefrontBuilder() {
  const [ref, isInView] = useInView();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [storeName, setStoreName] = useState('');
  const [tagline, setTagline] = useState('');
  const [handle, setHandle] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Store className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Build Your Store</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Storefront Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create your beautiful online store in minutes with our easy-to-use builder
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  step >= num
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-24 h-1 ${
                    step > num ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? 'text-pink-500' : ''}>Choose Template</span>
            <span className={step >= 2 ? 'text-pink-500' : ''}>Customize</span>
            <span className={step >= 3 ? 'text-pink-500' : ''}>Preview & Launch</span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Choose Your Template
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  selected={selectedTemplate === template.id}
                  onSelect={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => selectedTemplate && setStep(2)}
                disabled={!selectedTemplate}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  selectedTemplate
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Customization
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Customize Your Store
            </h2>
            <div className="glassmorphism p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Type className="w-5 h-5 text-pink-500" />
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter your store name..."
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      <Tag className="w-5 h-5 text-pink-500" />
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Eg. Handmade, planet-friendly essentials"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      <LinkIcon className="w-5 h-5 text-pink-500" />
                      Store Link (handle)
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus-within:border-pink-400">
                      <span className="text-sm text-gray-500 dark:text-gray-400">womenpreneur.store/</span>
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                        placeholder="your-brand"
                        className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Palette className="w-5 h-5 text-pink-500" />
                    Color Theme
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorThemes.map((theme, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTheme(index)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                          selectedTheme === index
                            ? 'border-pink-500 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex gap-2 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Image className="w-5 h-5 text-pink-500" />
                    Upload Logo
                  </label>
                  <div className="border-2 border-dashed border-pink-300 dark:border-pink-500/30 rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer">
                    <Image className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Layout className="w-5 h-5 text-pink-500" />
                    Store Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell customers about your store..."
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all resize-none text-gray-800 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Preview Store
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Preview Your Store
            </h2>
            <div className="glassmorphism p-8 rounded-3xl max-w-5xl mx-auto mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {storeName || 'Your Store Name'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      womenpreneur.store/{handle || 'your-brand'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {tagline || 'Welcome to our store! We offer high-quality products with excellent customer service.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {["Featured product photography", "Shipping & returns policy", "COD + UPI ready"].map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="glassmorphism p-4 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Launch checklist</p>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Add 6 product photos (1:1).</li>
                    <li>• Write 3 USPs in 1 line each.</li>
                    <li>• Set shipping & COD rules.</li>
                    <li>• Connect UPI / Razorpay checkout.</li>
                  </ul>
                </div>
                <div className="glassmorphism p-4 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-pink-500" />
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">SEO & trust</p>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Keep URL handle short & readable.</li>
                    <li>• Add meta title: {storeName || 'Your Store'} | Women-led brand.</li>
                    <li>• Add WhatsApp contact & return policy link.</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                >
                  Edit Store
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Launch Store
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateCard({ template, index, selected, onSelect }: {
  template: typeof templates[0];
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`cursor-pointer glassmorphism rounded-3xl overflow-hidden transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${selected ? 'ring-4 ring-pink-500 scale-105' : 'hover:scale-105'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-48 object-cover"
        />
        {selected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">✓</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
      </div>
    </div>
  );
}
