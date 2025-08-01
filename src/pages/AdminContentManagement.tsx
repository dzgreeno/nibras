import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Search,
  Filter,
  FolderTree,
  Save,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  Settings
} from 'lucide-react';

interface ContentNode {
  id: string;
  name: string;
  type: 'grade' | 'subject' | 'unit' | 'lesson' | 'video' | 'document' | 'quiz';
  children?: ContentNode[];
  isExpanded?: boolean;
  parentId?: string;
  description?: string;
  status: 'published' | 'draft' | 'review';
  createdAt: string;
  updatedAt: string;
}

const AdminContentManagement: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo, showConfirm } = useNotification();
  const [activeTab, setActiveTab] = useState<'tree' | 'list' | 'media' | 'settings'>('tree');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<ContentNode | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newContent, setNewContent] = useState({
    name: '',
    type: 'lesson' as ContentNode['type'],
    description: '',
    parentId: ''
  });

  // بيانات المحتوى التعليمي وفقاً للمنهاج الجزائري 2024-2025
  const [contentTree, setContentTree] = useState<ContentNode[]>([
    {
      id: '1',
      name: 'السنة الأولى ابتدائي',
      type: 'grade',
      status: 'published',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      description: 'المنهاج المعدل 2024-2025 - 21 ساعة أسبوعياً',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: 'اللغة العربية',
          type: 'subject',
          parentId: '1',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '11 ساعة أسبوعياً - 14 حصة (8 حصص ساعة + 6 حصص 30 دقيقة)',
          isExpanded: true,
          children: [
            {
              id: '1-1-1',
              name: 'الحروف الهجائية',
              type: 'unit',
              parentId: '1-1',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'تعلم الحروف الهجائية (أصواتها وأشكالها)',
              isExpanded: false,
              children: [
                {
                  id: '1-1-1-1',
                  name: 'درس حرف الباء',
                  type: 'lesson',
                  parentId: '1-1-1',
                  description: 'تمييز حرف الباء شكلاً ونطقاً وكتابته',
                  status: 'published',
                  createdAt: '2024-01-01',
                  updatedAt: '2024-01-15'
                },
                {
                  id: '1-1-1-2',
                  name: 'تمارين حرف الباء',
                  type: 'quiz',
                  parentId: '1-1-1',
                  description: 'تمارين تطبيقية على حرف الباء',
                  status: 'published',
                  createdAt: '2024-01-01',
                  updatedAt: '2024-01-15'
                }
              ]
            },
            {
              id: '1-1-2',
              name: 'القراءة والكتابة',
              type: 'unit',
              parentId: '1-1',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'المفردات الأساسية والجمل البسيطة',
              isExpanded: false,
              children: []
            },
            {
              id: '1-1-3',
              name: 'فهم المقروء البسيط',
              type: 'unit',
              parentId: '1-1',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'فهم نصوص قصيرة والتعبير الشفوي البسيط',
              isExpanded: false,
              children: []
            }
          ]
        },
        {
          id: '1-2',
          name: 'الرياضيات',
          type: 'subject',
          parentId: '1',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '5 ساعات أسبوعياً - 7 حصص (3 حصص ساعة + 4 حصص 30 دقيقة) + 30 دقيقة ألعاب رياضية',
          isExpanded: true,
          children: [
            {
              id: '1-2-1',
              name: 'الأعداد من 0 إلى 9',
              type: 'unit',
              parentId: '1-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'تعلم الأعداد والعد والمقارنة',
              isExpanded: false,
              children: [
                {
                  id: '1-2-1-1',
                  name: 'درس العدد 3',
                  type: 'lesson',
                  parentId: '1-2-1',
                  description: 'العد حتى العدد 3 وتمييزه كمياً وكتابة الرمز',
                  status: 'published',
                  createdAt: '2024-01-01',
                  updatedAt: '2024-01-15'
                }
              ]
            },
            {
              id: '1-2-2',
              name: 'العمليات الحسابية البسيطة',
              type: 'unit',
              parentId: '1-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'الجمع والطرح ضمن العدد 9',
              isExpanded: false,
              children: []
            },
            {
              id: '1-2-3',
              name: 'الأشكال الهندسية الأساسية',
              type: 'unit',
              parentId: '1-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'التمييز بين الأشكال والمفاهيم الأولية للقياس',
              isExpanded: false,
              children: []
            },
            {
              id: '1-2-4',
              name: 'الألعاب الرياضية',
              type: 'unit',
              parentId: '1-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'ألعاب لتعزيز تعلم المفاهيم الرياضية بشكل عملي وممتع',
              isExpanded: false,
              children: []
            }
          ]
        },
        {
          id: '1-3',
          name: 'التربية الإسلامية',
          type: 'subject',
          parentId: '1',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً - 3 حصص (كل حصة 30 دقيقة)',
          isExpanded: false,
          children: [
            {
              id: '1-3-1',
              name: 'أركان الإسلام والإيمان',
              type: 'unit',
              parentId: '1-3',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'تعلم أركان الإسلام الخمسة',
              isExpanded: false,
              children: []
            },
            {
              id: '1-3-2',
              name: 'قصص الأنبياء المبسطة',
              type: 'unit',
              parentId: '1-3',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'قصص مبسطة من سير الأنبياء',
              isExpanded: false,
              children: []
            },
            {
              id: '1-3-3',
              name: 'الآداب الإسلامية الأساسية',
              type: 'unit',
              parentId: '1-3',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'السور القصيرة والآداب الإسلامية',
              isExpanded: false,
              children: []
            }
          ]
        },
        {
          id: '1-4',
          name: 'التربية الفنية والرياضية',
          type: 'subject',
          parentId: '1',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'التربية الفنية: ساعة ونصف أسبوعياً | التربية الرياضية: ساعتان أسبوعياً (زيادة من 7% إلى 20%)',
          isExpanded: false,
          children: [
            {
              id: '1-4-1',
              name: 'الأنشطة الفنية',
              type: 'unit',
              parentId: '1-4',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'الرسم، التلوين، التشكيل',
              isExpanded: false,
              children: []
            },
            {
              id: '1-4-2',
              name: 'الأنشطة الرياضية',
              type: 'unit',
              parentId: '1-4',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'الألعاب الحركية، التمارين الرياضية البسيطة',
              isExpanded: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'السنة الثانية ابتدائي',
      type: 'grade',
      status: 'published',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      description: 'المنهاج المعدل 2024-2025 - 21 ساعة أسبوعياً (نفس تعديلات السنة الأولى)',
      isExpanded: false,
      children: [
        {
          id: '2-1',
          name: 'اللغة العربية',
          type: 'subject',
          parentId: '2',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '11 ساعة أسبوعياً - 14 حصة',
          isExpanded: false,
          children: [
            {
              id: '2-1-1',
              name: 'قواعد اللغة الأساسية',
              type: 'unit',
              parentId: '2-1',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'الاسم، الفعل، الحرف',
              isExpanded: false,
              children: []
            },
            {
              id: '2-1-2',
              name: 'التعبير الشفوي والكتابي',
              type: 'unit',
              parentId: '2-1',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'التعبير عن الأفكار بشكل بسيط',
              isExpanded: false,
              children: []
            }
          ]
        },
        {
          id: '2-2',
          name: 'الرياضيات',
          type: 'subject',
          parentId: '2',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '5 ساعات أسبوعياً + 30 دقيقة ألعاب رياضية',
          isExpanded: false,
          children: [
            {
              id: '2-2-1',
              name: 'الأعداد حتى 99',
              type: 'unit',
              parentId: '2-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'تعلم الأعداد الأكبر والعمليات المتقدمة',
              isExpanded: false,
              children: []
            },
            {
              id: '2-2-2',
              name: 'مفهوم الضرب',
              type: 'unit',
              parentId: '2-2',
              status: 'published',
              createdAt: '2024-01-01',
              updatedAt: '2024-01-15',
              description: 'الضرب كعملية تكرار للجمع',
              isExpanded: false,
              children: []
            }
          ]
        },
        {
          id: '2-3',
          name: 'التربية الإسلامية',
          type: 'subject',
          parentId: '2',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً - 3 حصص',
          isExpanded: false,
          children: []
        },
        {
          id: '2-4',
          name: 'التربية الفنية والرياضية',
          type: 'subject',
          parentId: '2',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'التربية الفنية: ساعة ونصف | التربية الرياضية: ساعتان',
          isExpanded: false,
          children: []
        }
      ]
    },
    {
      id: '3',
      name: 'السنة الثالثة ابتدائي',
      type: 'grade',
      status: 'published',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      description: 'إدخال اللغة الفرنسية كلغة أجنبية أولى',
      isExpanded: false,
      children: [
        {
          id: '3-1',
          name: 'اللغة العربية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'قواعد اللغة المتقدمة والتعبير',
          isExpanded: false,
          children: []
        },
        {
          id: '3-2',
          name: 'الرياضيات',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'الأعداد حتى 9999 والعمليات الأربع',
          isExpanded: false,
          children: []
        },
        {
          id: '3-3',
          name: 'التربية الإسلامية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'قصص الأنبياء والآداب الإسلامية المتقدمة',
          isExpanded: false,
          children: []
        },
        {
          id: '3-4',
          name: 'التربية العلمية والتكنولوجية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'الكائنات الحية والبيئة والظواهر الطبيعية',
          isExpanded: false,
          children: []
        },
        {
          id: '3-5',
          name: 'التربية المدنية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'الهوية الوطنية والحقوق والواجبات',
          isExpanded: false,
          children: []
        },
        {
          id: '3-6',
          name: 'اللغة الفرنسية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'اللغة الأجنبية الأولى - الحروف والمفردات الأساسية',
          isExpanded: false,
          children: []
        },
        {
          id: '3-7',
          name: 'التربية الفنية والرياضية',
          type: 'subject',
          parentId: '3',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'الأنشطة الفنية والرياضية المتقدمة',
          isExpanded: false,
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'السنة الرابعة ابتدائي',
      type: 'grade',
      status: 'published',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      description: 'تعميق المهارات وإدخال مواد جديدة',
      isExpanded: false,
      children: [
        {
          id: '4-1',
          name: 'اللغة العربية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'قواعد النحو والصرف المتقدمة',
          isExpanded: false,
          children: []
        },
        {
          id: '4-2',
          name: 'الرياضيات',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'الأعداد الكبيرة والكسور والهندسة',
          isExpanded: false,
          children: []
        },
        {
          id: '4-3',
          name: 'التربية الإسلامية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'السيرة النبوية والأحكام الفقهية',
          isExpanded: false,
          children: []
        },
        {
          id: '4-4',
          name: 'التربية العلمية والتكنولوجية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'المادة والطاقة والتكنولوجيا',
          isExpanded: false,
          children: []
        },
        {
          id: '4-5',
          name: 'التربية المدنية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'المؤسسات والقوانين',
          isExpanded: false,
          children: []
        },
        {
          id: '4-6',
          name: 'اللغة الفرنسية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'التراكيب اللغوية والنصوص',
          isExpanded: false,
          children: []
        },
        {
          id: '4-7',
          name: 'اللغة الأمازيغية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'اللغة الوطنية الثانية (حسب المنطقة)',
          isExpanded: false,
          children: []
        },
        {
          id: '4-8',
          name: 'التاريخ والجغرافيا',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'تاريخ وجغرافية الجزائر',
          isExpanded: false,
          children: []
        },
        {
          id: '4-9',
          name: 'التربية الفنية والرياضية',
          type: 'subject',
          parentId: '4',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'المهارات الفنية والرياضية المتقدمة',
          isExpanded: false,
          children: []
        }
      ]
    },
    {
      id: '5',
      name: 'السنة الخامسة ابتدائي',
      type: 'grade',
      status: 'published',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      description: 'إدخال اللغة الإنجليزية كمادة جديدة - المنهاج المعدل 2024-2025',
      isExpanded: false,
      children: [
        {
          id: '5-1',
          name: 'اللغة العربية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '6 ساعات و30 دقيقة أسبوعياً - 9 حصص دراسية',
          isExpanded: false,
          children: []
        },
        {
          id: '5-2',
          name: 'الرياضيات',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '4 ساعات و30 دقيقة أسبوعياً - 6 حصص',
          isExpanded: false,
          children: []
        },
        {
          id: '5-3',
          name: 'التربية الإسلامية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً',
          isExpanded: false,
          children: []
        },
        {
          id: '5-4',
          name: 'التربية العلمية والتكنولوجية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً - حصتان 45 دقيقة',
          isExpanded: false,
          children: []
        },
        {
          id: '5-5',
          name: 'التربية المدنية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '45 دقيقة أسبوعياً',
          isExpanded: false,
          children: []
        },
        {
          id: '5-6',
          name: 'اللغة الفرنسية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: '3 ساعات أسبوعياً - 3 حصص',
          isExpanded: false,
          children: []
        },
        {
          id: '5-7',
          name: 'اللغة الإنجليزية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً - جلستان 45 دقيقة (مادة جديدة 2024-2025)',
          isExpanded: false,
          children: []
        },
        {
          id: '5-8',
          name: 'اللغة الأمازيغية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'اللغة الوطنية الثانية',
          isExpanded: false,
          children: []
        },
        {
          id: '5-9',
          name: 'التاريخ والجغرافيا',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'ساعة ونصف أسبوعياً',
          isExpanded: false,
          children: []
        },
        {
          id: '5-10',
          name: 'التربية الفنية والرياضية',
          type: 'subject',
          parentId: '5',
          status: 'published',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          description: 'التربية البدنية: ساعة واحدة | التربية الفنية: 45 دقيقة',
          isExpanded: false,
          children: []
        }
      ]
    }
  ]);

  const getNodeIcon = (type: ContentNode['type']) => {
    switch (type) {
      case 'grade': return <Folder className="w-4 h-4 text-blue-600" />;
      case 'subject': return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'unit': return <FolderTree className="w-4 h-4 text-purple-600" />;
      case 'lesson': return <FileText className="w-4 h-4 text-orange-600" />;
      case 'video': return <Video className="w-4 h-4 text-red-600" />;
      case 'document': return <File className="w-4 h-4 text-gray-600" />;
      case 'quiz': return <Settings className="w-4 h-4 text-yellow-600" />;
      default: return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ContentNode['status']) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: ContentNode['status']) => {
    switch (status) {
      case 'published': return 'منشور';
      case 'draft': return 'مسودة';
      case 'review': return 'قيد المراجعة';
      default: return 'غير محدد';
    }
  };

  const toggleNodeExpansion = (nodeId: string) => {
    const updateNode = (nodes: ContentNode[]): ContentNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setContentTree(updateNode(contentTree));
  };

  const renderTreeNode = (node: ContentNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
            selectedNode?.id === node.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
          }`}
          style={{ paddingRight: `${level * 20 + 8}px` }}
          onClick={() => setSelectedNode(node)}
        >
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNodeExpansion(node.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {node.isExpanded ? 
                <ChevronDown className="w-4 h-4 text-gray-600" /> : 
                <ChevronRight className="w-4 h-4 text-gray-600" />
              }
            </button>
          ) : (
            <div className="w-6"></div>
          )}
          
          {getNodeIcon(node.type)}
          
          <span className="flex-1 text-sm font-medium text-gray-900">{node.name}</span>
          
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(node.status)}`}>
            {getStatusText(node.status)}
          </span>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node);
                setShowEditModal(true);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Edit className="w-3 h-3 text-gray-600" />
            </button>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                const confirmed = await showConfirm(
                  'تأكيد الحذف',
                  'هل أنت متأكد من حذف هذا العنصر؟'
                );
                if (confirmed) {
                  showSuccess('تم الحذف', 'تم حذف العنصر بنجاح');
                }
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
          </div>
        </div>
        
        {hasChildren && node.isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderTreeTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* شجرة المحتوى */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">هيكل المحتوى</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              إضافة
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="البحث في المحتوى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-1 group">
            {contentTree.map(node => renderTreeNode(node))}
          </div>
        </div>
      </div>
      
      {/* تفاصيل العنصر المحدد */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">تفاصيل العنصر</h3>
        </div>
        
        <div className="p-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <p className="text-sm text-gray-900">{selectedNode.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                <div className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.type)}
                  <span className="text-sm text-gray-900">{selectedNode.type}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedNode.status)}`}>
                  {getStatusText(selectedNode.status)}
                </span>
              </div>
              
              {selectedNode.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <p className="text-sm text-gray-600">{selectedNode.description}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الإنشاء</label>
                <p className="text-sm text-gray-600">{selectedNode.createdAt}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">آخر تحديث</label>
                <p className="text-sm text-gray-600">{selectedNode.updatedAt}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    تعديل
                  </button>
                  <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" />
                    معاينة
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">اختر عنصراً لعرض تفاصيله</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderListTab = () => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">قائمة المحتوى</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">جميع الأنواع</option>
                <option value="lesson">دروس</option>
                <option value="video">فيديوهات</option>
                <option value="document">مستندات</option>
                <option value="quiz">اختبارات</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              إضافة محتوى
            </button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="البحث في المحتوى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المحتوى
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                النوع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                آخر تحديث
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* سيتم ملء هذا القسم بالبيانات المفلترة */}
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                لا توجد عناصر لعرضها
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">مكتبة الوسائط</h3>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1">
            <Upload className="w-4 h-4" />
            رفع ملف
          </button>
        </div>
      </div>
      
      <div className="p-8 text-center">
        <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">مكتبة الوسائط</h4>
        <p className="text-gray-600 mb-4">إدارة الصور والفيديوهات والملفات الصوتية</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          استكشاف المكتبة
        </button>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">إعدادات المحتوى</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">إعدادات النشر</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="mr-2 text-sm text-gray-700">مراجعة المحتوى قبل النشر</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="mr-2 text-sm text-gray-700">إشعار المعلمين عند إضافة محتوى جديد</span>
            </label>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-3">إعدادات الوسائط</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى لحجم الملف (MB)</label>
              <input
                type="number"
                defaultValue="50"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">أنواع الملفات المسموحة</label>
              <input
                type="text"
                defaultValue="jpg, png, gif, mp4, pdf, docx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المحتوى التعليمي</h1>
              <p className="text-gray-600">نظام إدارة المحتوى الشامل للمنصة التعليمية</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Upload className="w-4 h-4" />
                استيراد محتوى
              </button>
            </div>
          </div>

          {/* التبويبات */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              {[
                { id: 'tree', label: 'هيكل المحتوى', icon: FolderTree },
                { id: 'list', label: 'قائمة المحتوى', icon: FileText },
                { id: 'media', label: 'مكتبة الوسائط', icon: Image },
                { id: 'settings', label: 'الإعدادات', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'tree' | 'list' | 'media' | 'settings')}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* محتوى التبويبات */}
        <div>
          {activeTab === 'tree' && renderTreeTab()}
          {activeTab === 'list' && renderListTab()}
          {activeTab === 'media' && renderMediaTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>

        {/* نافذة إضافة محتوى جديد */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">إضافة محتوى جديد</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المحتوى
                  </label>
                  <input
                    type="text"
                    value={newContent.name}
                    onChange={(e) => setNewContent({...newContent, name: e.target.value})}
                    placeholder="أدخل اسم المحتوى"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع المحتوى
                  </label>
                  <select
                    value={newContent.type}
                    onChange={(e) => setNewContent({...newContent, type: e.target.value as ContentNode['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="grade">سنة دراسية</option>
                    <option value="subject">مادة</option>
                    <option value="unit">وحدة</option>
                    <option value="lesson">درس</option>
                    <option value="video">فيديو</option>
                    <option value="document">مستند</option>
                    <option value="quiz">اختبار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوصف
                  </label>
                  <textarea
                    rows={3}
                    value={newContent.description}
                    onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                    placeholder="اكتب وصف المحتوى هنا..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    // إضافة المحتوى الجديد
                    setShowAddModal(false);
                    setNewContent({ name: '', type: 'lesson', description: '', parentId: '' });
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  حفظ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* نافذة تعديل المحتوى */}
        {showEditModal && selectedNode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">تعديل المحتوى</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المحتوى
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedNode.name}
                    placeholder="أدخل اسم المحتوى"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع المحتوى
                  </label>
                  <select
                    defaultValue={selectedNode.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="grade">سنة دراسية</option>
                    <option value="subject">مادة</option>
                    <option value="unit">وحدة</option>
                    <option value="lesson">درس</option>
                    <option value="video">فيديو</option>
                    <option value="document">مستند</option>
                    <option value="quiz">اختبار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة
                  </label>
                  <select
                    defaultValue={selectedNode.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="published">منشور</option>
                    <option value="draft">مسودة</option>
                    <option value="review">قيد المراجعة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الوصف
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedNode.description || ''}
                    placeholder="اكتب وصف المحتوى هنا..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    // حفظ التعديلات
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                >
                  <Save className="w-4 h-4" />
                  حفظ التعديلات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContentManagement;