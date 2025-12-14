import { MessageSquare, Clock, Target } from 'lucide-react';

/**
 * Problem → Solution → Result Cards
 * Showcasing platform value proposition
 */

export const problemCards = [
    {
        icon: MessageSquare,
        iconColor: 'text-purple-400',
        problem_ar: 'فريق الدعم مثقل بالأسئلة المتكررة',
        problem_en: 'Support team overwhelmed with repetitive questions',
        solution_ar: 'AI يتعامل مع الأسئلة الشائعة تلقائياً بـ 12 لغة',
        solution_en: 'AI handles FAQs automatically in 12 languages',
        result_ar: '80% تقليل في تذاكر الدعم',
        result_en: '80% reduction in support tickets',
        metric_ar: '4 ساعات توفير يومياً',
        metric_en: '4 hours saved daily'
    },
    {
        icon: Clock,
        iconColor: 'text-cyan-400',
        problem_ar: 'أوقات استجابة بطيئة تضر برضا العملاء',
        problem_en: 'Slow response times hurt customer satisfaction',
        solution_ar: 'استجابات AI فورية، متاحة 24/7',
        solution_en: 'Instant AI responses, 24/7 availability',
        result_ar: '< 1 ثانية متوسط وقت الاستجابة',
        result_en: '< 1 second average response time',
        metric_ar: '94% معدل رضا العملاء',
        metric_en: '94% CSAT score'
    },
    {
        icon: Target,
        iconColor: 'text-green-400',
        problem_ar: 'التكامل المعقد يستغرق أسابيع',
        problem_en: 'Complex integration takes weeks',
        solution_ar: 'كود تضمين نسخ-لصق، يعمل في كل مكان',
        solution_en: 'Copy-paste embed code, works everywhere',
        result_ar: 'جاهز في 10 دقائق',
        result_en: 'Live in 10 minutes',
        metric_ar: 'صفر وقت تطوير مطلوب',
        metric_en: 'Zero dev time needed'
    }
];
