<?php
namespace KrOs\WFIS\FrontendBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\AbstractType;

class ArticleType extends AbstractType
{
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('icon_class', 'text', array('required' => false))
            ->add('content', 'textarea', array('required' => false));
    }
    
    public function getName()
    {
        return "ArticleType";
    }
}
